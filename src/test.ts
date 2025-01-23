import { _http } from './api/_http'

const data = await _http<{ kale: string }>({
	url: 'http://localhost:8080/ping',
})
console.log(data)
