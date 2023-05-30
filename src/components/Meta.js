import Head from 'next/head';

export const Meta = ({title, keywords, description}) => {
  return (
    <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1'></meta>
        <meta name='keywords' content={keywords}></meta>
        <meta name='description' content={description}></meta>
        <meta charSet='utf-8'></meta>
        <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
    title: 'Deel je rekening. Simpel. | Betaal Je Raak',
    keywords: '',
    description: ''
}
