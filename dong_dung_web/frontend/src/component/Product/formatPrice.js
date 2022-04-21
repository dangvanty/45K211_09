export function formatNumber (num) {
  num=num*1000000;
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  }

