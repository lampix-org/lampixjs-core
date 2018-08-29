// @public (undocumented)
class LampixBridge implements ILampixBridge {
  getLampixInfo(): Promise<LampixInfo>;
}

// @public
interface LampixInfo {
  id: string;
  isSimulator: boolean;
  version: string;
}

// WARNING: Unsupported export: lampix
// (No @packagedocumentation comment for this package)
