const blocks = [
  {
    block: 1,
    nonce: 12345678,
    data: {
      date: 1519329662134,
      mileage: 13300,
      color: 'black',
      type: 'van/suv',
      vehicleNumber: 'XYZ',
    },
    prev: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: '!!!!!!!!!!19650120788755289113415010519474508961984651065122053261333768133'
  },
  {
    block: 2,
    nonce: 12345679,
    data: {
      date: 1519329662134,
      vehicleNumber: 'XYZ',
      mileage: 23300,
      color: 'black',
      type: 'van/suv'
    },
    prev: '!!!!!!!!!!19650120788755289113415010519474508961984651065122053261333768133'
  }
]

const encryptedBlocks = [
  {
    block: 1,
    nonce: 12345678,
    data: 'U2FsdGVkX182Xf76Mt4mtKETD8Dzheo9R5B9se2+08vx2LRWRkz9LvoZtJy2bwWgTezX7+cz0htSsgQaZe3w/Ryd6nm9YKyx/HcTMQB89DHS3Rrsnbq3tXecKvISF2YfcbtUrTUgaGqNm8dlRfitKA==',
    prev: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: '!!!!!!!!!!72830820416947638321720731356665731556168791738815336998132018687061'
  },
  { block: 2,
    nonce: 12345679,
    date: 1519329662135,
    data: 'U2FsdGVkX19Kj9FbvFjJuMPeymOhkVzhXaF19AAQ049hNYfV3BeLzszgIB8Td53jc3ai9dP3AOk/4aMsSrOxUKaqIwNgalctjnLG6rpjSikE1RvoJXRRUIMp8iphnbzcQ9xm4xl5ha/JuDCQUmYjgQ==',
    prev: '!!!!!!!!!!72830820416947638321720731356665731556168791738815336998132018687061',
    hash: '!!1234567818393595168755401315644458145875007001046822849166932891466390961'
  }
]

module.exports = {
  blocks,
  encryptedBlocks
}
