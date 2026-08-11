import { IndexedDbArcRepository } from "./arc-store.js";
import {
  CloudSchemaError,
  CloudUnavailableError,
  SupabaseArcRepository,
} from "./supabase-arc-store.js";

/**
 * Cloud-first when the existing Chrono-Deck Supabase session is available;
 * local-first fallback otherwise. Cloud results are mirrored into IndexedDB
 * without creating duplicate local revisions.
 */
export class HybridArcRepository {
  constructor({ local = new IndexedDbArcRepository(), cloud = new SupabaseArcRepository() } = {}) {
    this.local = local;
    this.cloud = cloud;
    this.lastState = {
      mode: "local",
      warning: "",
      cloudConfigured: this.cloud.isConfigured(),
      cloudSignedIn: this.cloud.isSignedIn(),
    };
  }

  state() {
    const cloudState = this.cloud.getState();
    return {
      ...this.lastState,
      cloudConfigured: cloudState.configured,
      cloudSignedIn: cloudState.signedIn,
      cloudEmail: cloudState.email,
    };
  }

  setState(mode, warning = "") {
    this.lastState = {
      mode,
      warning,
      cloudConfigured: this.cloud.isConfigured(),
      cloudSignedIn: this.cloud.isSignedIn(),
    };
  }

  shouldFallback(error) {
    return error instanceof CloudUnavailableError || error instanceof CloudSchemaError || error instanceof TypeError;
  }

  warningFor(error) {
    if (error instanceof CloudSchemaError) return error.message;
    if (error instanceof CloudUnavailableError) return error.message;
    if (error instanceof TypeError) return "Network unavailable; using the local Vault cache.";
    return error?.message || "Cloud Vault unavailable; using local storage.";
  }

  async load(arcId) {
    if (this.cloud.isSignedIn()) {
      try {
        const cloudDocument = await this.cloud.load(arcId);
        if (cloudDocument) {
          await this.local.cacheDocument(cloudDocument);
          this.setState("cloud");
          return cloudDocument;
        }
        const localDocument = await this.local.load(arcId);
        this.setState(
          localDocument ? "local" : "cloud",
          localDocument ? "This ARC exists only on this device. Save it once to upload it to the cloud Vault." : "",
        );
        return localDocument;
      } catch (error) {
        if (!this.shouldFallback(error)) throw error;
        const localDocument = await this.local.load(arcId);
        this.setState("local", this.warningFor(error));
        return localDocument;
      }
    }

    const localDocument = await this.local.load(arcId);
    this.setState(
      "local",
      this.cloud.isConfigured()
        ? "Cloud is configured but not signed in; changes stay on this device until you sign in and save again."
        : "Cloud Vault is not configured; changes stay on this device.",
    );
    return localDocument;
  }

  async listDocuments() {
    if (this.cloud.isSignedIn()) {
      try {
        const documents = await this.cloud.listDocuments();
        this.setState("cloud");
        return documents;
      } catch (error) {
        if (!this.shouldFallback(error)) throw error;
        this.setState("local", this.warningFor(error));
      }
    }
    return this.local.listDocuments();
  }

  async save(document, note = "Saved") {
    if (this.cloud.isSignedIn()) {
      try {
        const saved = await this.cloud.save(document, note);
        await this.local.cacheDocument(saved);
        this.setState("cloud");
        return saved;
      } catch (error) {
        if (!this.shouldFallback(error)) throw error;
        const saved = await this.local.save(document, note);
        this.setState("local", `${this.warningFor(error)} Saved locally instead.`);
        return saved;
      }
    }

    const saved = await this.local.save(document, note);
    this.setState(
      "local",
      this.cloud.isConfigured()
        ? "Saved locally. Sign in and save once more to upload this ARC to Supabase."
        : "Saved locally. Configure cloud sync to enable cross-device ARC storage.",
    );
    return saved;
  }

  async listRevisions(arcId) {
    if (this.cloud.isSignedIn()) {
      try {
        const revisions = await this.cloud.listRevisions(arcId);
        this.setState("cloud");
        return revisions;
      } catch (error) {
        if (!this.shouldFallback(error)) throw error;
        this.setState("local", this.warningFor(error));
      }
    }
    return this.local.listRevisions(arcId);
  }

  async restoreRevision(arcId, revisionId) {
    if (this.cloud.isSignedIn()) {
      try {
        const restored = await this.cloud.restoreRevision(arcId, revisionId);
        await this.local.cacheDocument(restored);
        this.setState("cloud");
        return restored;
      } catch (error) {
        if (!this.shouldFallback(error)) throw error;
        const restored = await this.local.restoreRevision(arcId, revisionId);
        this.setState("local", `${this.warningFor(error)} Restored from local history.`);
        return restored;
      }
    }

    const restored = await this.local.restoreRevision(arcId, revisionId);
    this.setState("local", "Restored from local history.");
    return restored;
  }

  async importDocument(document, note = "Imported") {
    return this.save(document, note);
  }
}
