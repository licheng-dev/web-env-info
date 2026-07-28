export interface EnvInfoOptions {
  env?: string
  projectName?: string
  showBranch?: boolean
  showTime?: boolean
  showNodeVersion?: boolean
}

export interface EnvInfo {
  projectName: string
  env: string
  time: string
  nodeVersion: string
  branch: string | null
}
