import fs from 'fs/promises'

import { rootPath } from 'resources/constants'

export default function trace(...args: any[]): void {
  const filePath = `${rootPath}/trace.log`
  const content = `${new Date().toLocaleString('fr-FR')} : ${args.join(' ')}\n`

  fs.access(filePath)
    .then(() => fs.appendFile(filePath, content))
    .catch(() => fs.writeFile(filePath, content))
    .catch(() => console.log('Error while writing trace file'))
}
