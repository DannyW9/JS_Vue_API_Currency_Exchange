import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      exchange: [],
      newExchange: [],
      baseCurrency: "",
      secondCurrency: "",
      amount: ""
    },
    methods: {
      fetchInitialRates: function(){
        fetch(`https://api.exchangeratesapi.io/latest`)
        .then(response => response.json())
        .then((data) => {
          this.exchange = data.rates;
        });
      }
    },
    computed: {
      convertedFromEur: function(){
        if (this.amount === 0 || this.secondCurrency === "") {
          return "Please select currency and enter amount";
        } else {
        return (this.amount * this.secondCurrency).toFixed(2);
      }
      },
      convertedToEur: function(){
        if (this.amount === 0 || this.secondCurrency === "") {
          return "Please select currency and enter amount";
        } else {
          return (this.amount / this.secondCurrency).toFixed(2);
      }
    },
    fetchNewRates: function(){
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.baseCurrency}`)
      .then(response => response.json())
      .then((data) => {
        this.newExchange = data.rates;
      });
    }
    },
    mounted(){
      this.fetchInitialRates();
      this.fetchNewRates();
    }
  })
})
