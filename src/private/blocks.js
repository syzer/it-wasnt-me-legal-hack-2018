const blocks = [
  {
    block: 1,
    once: 12345678,
    data: {
      date: 1519329662134,
      milage: 13300,
      color: 'black',
      type: 'van/suv',
      vehicleNumber: 'XYZ',
    },
    prev: '0000000000000000000000000000000000000000000000000000000000000000'
  },
  {
    block: 2,
    once: 12345678,
    vehicleNumber: 'XYZ',
    date: 1519329662134,
    data: {
      milage: 1000,
      color: 'black',
      type: 'van/suv'
    },
    prev: '0000000000000000000000000000000000000000000000000000000000000000'
  }
]

module.exports = {
  blocks
}
