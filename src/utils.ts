import { readFileSync } from 'fs'
import { join } from 'path'
import type { EnvInfoOptions } from './types'

function readPackageJson(root: string): Record<string, unknown> {
  try {
    const pkgPath = join(root, 'package.json')
    return JSON.parse(readFileSync(pkgPath, 'utf-8'))
  } catch {
    return {}
  }
}

export function getProjectName(root: string, options: EnvInfoOptions): string {
  if (options.projectName) {
    return options.projectName
  }
  const pkg = readPackageJson(root)
  return (pkg.name as string) || 'unknown'
}

export function getProjectVersion(root: string, options: EnvInfoOptions): string {
  if (options.version) {
    return options.version
  }
  const pkg = readPackageJson(root)
  return (pkg.version as string) || 'unknown'
}

export function getBuildEnv(options: EnvInfoOptions, mode: string): string {
  if (options.env) {
    return options.env
  }
  return mode
}

export function formatTime(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}
