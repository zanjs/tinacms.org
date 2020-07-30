import path from 'path'
import { readMarkdownFile } from 'utils/getMarkdownFile'
import { readJsonFile } from 'utils/getJsonPreviewProps'
import { MarkdownContent } from 'components/layout'
import { useCMS } from 'tinacms'
import fs from 'fs'

export default function TestPage({ guidesIndex, packagesIndex }) {
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
      <pre>{JSON.stringify(guidesIndex)}</pre>
      <pre>{JSON.stringify(packagesIndex)}</pre>
    </div>
  )
}

export const getStaticProps = async ({ preview }) => {
  return {
    props: {
      withoutGithub: true,
      preview: !!preview,
      guidesIndex: await fs.readFileSync(
        path.resolve(process.cwd(), './content/guides/index.md'),
        'utf8'
      ),
      packagesIndex: await readJsonFile(
        path.resolve(process.cwd(), './content/packages.json')
      ),
    },
  }
}
