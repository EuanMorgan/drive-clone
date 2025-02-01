export interface File {
  id: string
  name: string
  type: "file"
  url: string
  size: string
  modified: string
}

export interface Folder {
  id: string
  name: string
  type: "folder"
  children: (File | Folder)[]
  modified: string
}

export type Item = File | Folder

