import { readMarkdownFile } from 'utils/getMarkdownFile'
import { readJsonFile } from 'utils/getJsonPreviewProps'
import { MarkdownContent } from 'components/layout'
import { useCMS } from 'tinacms'
import fs from 'fs'
const fg = require('fast-glob')

//@ts-ignore
const path = __non_webpack_require__('path')

export default function TestPage({ guidesIndex, packagesIndex, guideFiles }) {
  const cms = useCMS()
  return (
    <div>
      <span>CMS is {cms.enabled ? 'Enabled' : 'Disabled'}</span>
      <hr />
      <button
        onClick={() => {
          fetch('/api/preview-test').then(() => window.location.reload())
        }}
      >
        Enter preview mode
      </button>
      <hr />
      <button
        onClick={() => {
          fetch('/api/reset-preview').then(() => window.location.reload())
        }}
      >
        Exit preview mode
      </button>
      <hr />
      <pre>{JSON.stringify(guideFiles, null, 2)}</pre>
      <pre>{JSON.stringify(guidesIndex, null, 2)}</pre>
      <pre>{JSON.stringify(packagesIndex, null, 2)}</pre>
    </div>
  )
}

export const getStaticProps = async ({ preview }) => {
  // the following line will cause all content files to be available in a serverless context
  path.resolve('./content/')

  const guides = path.resolve(process.cwd(), './content/guides/index.md')
  const pkgs = path.resolve(process.cwd(), './content/packages.json')
  const guideFiles = await fg(
    `${path.resolve('./content/guides')}/**/meta.json`
  )
  return {
    props: {
      guideFiles,
      withoutGithub: true,
      preview: !!preview,
      guidesIndex: await fs.readFileSync(guides, 'utf8'),
      packagesIndex: await readJsonFile(pkgs),
    },
  }
}
