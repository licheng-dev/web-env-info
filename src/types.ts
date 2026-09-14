export interface EnvInfoOptions {
  env?: string
  projectName?: string
  version?: string
  showTime?: boolean
}

export interface EnvInfo {
  projectName: string
  env: string
  version: string
  time: string
}
