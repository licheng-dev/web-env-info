import type { Plugin, ResolvedConfig } from 'vite'
import type { EnvInfo, EnvInfoOptions } from './types'
import { getProjectName, getProjectVersion, getBuildEnv, formatTime } from './utils'

const SEPARATOR = '========================================'

function collectEnvInfo(root: string, mode: string, options: EnvInfoOptions): EnvInfo {
  return {
    projectName: getProjectName(root, options),
    env: getBuildEnv(options, mode),
    version: getProjectVersion(root, options),
    time: formatTime(),
  }
}

function buildInjectedScript(info: EnvInfo, options: EnvInfoOptions): string {
  const logs: string[] = []

  logs.push(`console['log']('${SEPARATOR}')`)
  logs.push(`console['log']('  项目名称 : ${info.projectName}')`)
  logs.push(`console['log']('  项目版本 : ${info.version}')`)
  logs.push(`console['log']('  构建环境 : ${info.env}')`)

  if (options.showTime !== false) {
    logs.push(`console['log']('  构建时间 : ${info.time}')`)
  }

  logs.push(`console['log']('${SEPARATOR}')`)

  return `(function(){${logs.join(';')}})();`
}

export default function vitePluginEnvInfo(options: EnvInfoOptions = {}): Plugin {
  let resolvedConfig: ResolvedConfig | null = null

  return {
    name: 'vite-plugin-env-info',

    configResolved(config) {
      resolvedConfig = config
    },

    transformIndexHtml() {
      if (!resolvedConfig) return

      const info = collectEnvInfo(resolvedConfig.root, resolvedConfig.mode, options)
      const script = buildInjectedScript(info, options)

      return [
        {
          tag: 'script',
          children: script,
          injectTo: 'body',
        },
      ]
    },
  }
}

export type { EnvInfoOptions, EnvInfo }
