import {BASE_URL, PER_PAGE} from '../constants'
import type {WordPressDataType, WordPressDataTypeResponses} from '../types'

const username = 'Koen'
const password = 'YnRG dCtC PFtk OkFz 8y8o olCf'

export async function wpDataTypeFetch<T extends WordPressDataType>(
  type: T,
  page: number,
  edit: boolean = false,
): Promise<WordPressDataTypeResponses[T]> {
  const wpApiUrl = new URL(`${BASE_URL}/${type}`)
  wpApiUrl.searchParams.set('page', page.toString())
  wpApiUrl.searchParams.set('per_page', PER_PAGE.toString())

  const headers = new Headers()

  if (edit) {
    wpApiUrl.searchParams.set('context', 'edit')

    headers.set(
      'Authorization',
      'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
    )
  }

  return fetch(wpApiUrl, {headers}).then((res) => (res.ok ? res.json() : null))
}
