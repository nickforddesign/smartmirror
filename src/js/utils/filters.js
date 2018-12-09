const filters = {
  lowercase(value = '') {
    return value.toLowerCase()
  },
  uppercase(value = '') {
    return value.toUpperCase()
  },
  capitalize(value = '') {
    return value.replace(/\b\w/g, l => l.toUpperCase())
  },
  round(value = 0) {
    return Math.round(value)
  },
  pluralize(value = 0, noun = 'item') {
    let output = `${value} ${noun}`
    if (value !== 1) output = output + 's'
    return output
  },
  limit(value = '', length = 20) {
    let output = value
    if (value.length > length) {
      output = value.substring(0, length)
    }
    while (output[output.length - 1] === ' ') {
      output = output.substring(0, output.length - 1)
    }
    if (output !== value) {
      output = `${output}...`
    }
    return output
  }
}

export default filters
