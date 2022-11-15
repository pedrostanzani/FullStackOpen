const areEmpty = (...args) => {
  return args.filter(s => s.trim() === '').length > 0;
}

const exports = { areEmpty };

export default exports;