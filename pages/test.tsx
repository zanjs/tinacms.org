import path from 'path'
import { readMarkdownFile } from 'utils/getMarkdownFile'
import { readJsonFile } from 'utils/getJsonPreviewProps'
import { MarkdownContent } from 'components/layout'
import { EditLink } from 'components/layout/EditLink'
import { useCMS } from 'tinacms'

export default function TestPage({ guidesIndex, packagesIndex }) {
  const cms = useCMS()
  return (
    <div>
      <span>CMS is {cms.enabled ? 'Enabled' : 'Disabled'}</span>
      <EditLink />
      <MarkdownContent
        escapeHtml={false}
        content={guidesIndex.data.markdownBody}
      />
      <pre>{JSON.stringify(packagesIndex)}</pre>
    </div>
  )
}

export const getStaticProps = async ({ preview }) => {
  return {
    props: {
      preview: !!preview,
      guidesIndex: await readMarkdownFile(
        path.resolve(process.cwd(), './content/guides/index.md')
      ),
      packagesIndex: await readJsonFile(
        path.resolve(process.cwd(), './content/packages.json')
      ),
    },
  }
}
