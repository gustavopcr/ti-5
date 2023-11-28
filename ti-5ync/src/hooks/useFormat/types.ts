export type UseFormat = () => {
  formatBytes: (bytes: number, decimals?: number) => string;
};


export interface Items {
  name: String,
  birthtime: Date,
  mtime: Date,
  atime: Date,
  ctime: Date,
  isDir: boolean,
  type: String,
  ext: String,
}