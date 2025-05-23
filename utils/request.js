// utils/api.js
export const BASE_URL = 'http://106.15.137.235:8080/api';
// const BASE_URL = 'https://192.168.0.35:8080/api';
// export let BASE_URL  = "/pawlapi";

// utils/request.js
export function request({ url, method = 'GET', data = {} }) {
  const isForm = (method === 'POST' ||  method === 'PUT')

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method,
	  sslVerify:false,
      data: isForm ? formatFormData(data) : data,
      header: {
        'Content-Type': isForm
          ? 'application/x-www-form-urlencoded'
          : 'application/json',
        'Authorization': uni.getStorageSync('token') || ''
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
		console.log(res);
          uni.showToast({ title: res.data.message || '接口异常', icon: 'none' })
          reject(res)
        }
      },
      fail: (err) => {
        uni.showToast({ title: '网络异常', icon: 'none' })
        reject(err)
      }
    })
  })
}

// 将对象转为 URL 编码形式
function formatFormData(data) {
  return Object.entries(data)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&')
}

