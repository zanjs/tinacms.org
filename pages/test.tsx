import path from 'path'
import { readMarkdownFile } from 'utils/getMarkdownFile'
import { readJsonFile } from 'utils/getJsonPreviewProps'
import { MarkdownContent } from 'components/layout'
import { useCMS } from 'tinacms'
import fs from 'fs'

export default function TestPage({
  guidesIndex,
  packagesIndex,
  contentRoot,
  guidesRoot,
}) {
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
      <pre>{JSON.stringify(contentRoot, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(guidesRoot, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(guidesIndex, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(packagesIndex, null, 4)}</pre>
    </div>
  )
}

export const getStaticProps = async ({ preview }) => {
  const contentRoot = fs.readdirSync(path.resolve(process.cwd(), './content'))
  const guidesRoot = fs.readdirSync(
    path.resolve(process.cwd(), './content/guides')
  )

  let guidesIndex = {}
  let packagesIndex = {}
  try {
    guidesIndex = await fs.readFileSync(
      path.resolve(process.cwd(), './content/guides/index.md'),
      'utf8'
    )
  } catch (e) {
    console.error(e)
  }
  try {
    packagesIndex = await readJsonFile(
      path.resolve(process.cwd(), './content/packages.json')
    )
  } catch (e) {
    console.error(e)
  }
  return {
    props: {
      contentRoot,
      guidesRoot,
      withoutGithub: true,
      preview: !!preview,
      guidesIndex,
      packagesIndex,
    },
  }
}
