import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { EnvInfoOptions } from './types'

export function getGitBranch(root: string): string | null {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      cwd: root,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()
  } catch {
    return null
  }
}

export function getProjectName(root: string, options: EnvInfoOptions): string {
  if (options.projectName) {
    return options.projectName
  }
  try {
    const pkgPath = join(root, 'package.json')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    return pkg.name || 'unknown'
  } catch {
    return 'unknown'
  }
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
