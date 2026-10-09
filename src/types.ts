export interface EnvInfoOptions {
  env?: string
  projectName?: string
  version?: string
  commit?: string
  showTime?: boolean
  showCommit?: boolean
}

export interface EnvInfo {
  projectName: string
  env: string
  version: string
  commit: string
  time: string
}
