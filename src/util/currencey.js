function formatAmount(amount) {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
  
    return formatter.format(amount);
  }

  export default formatAmount;