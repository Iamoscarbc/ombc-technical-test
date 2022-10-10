<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-text-field
        v-model="value"
        label="Input value"
        filled
      ></v-text-field>
      <label for="">{{valueCesar}}</label>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => {
    return {
      value: 'Peru'
    }
  },
  computed: {
    valueCesar() {
      return this.cesar(this.value, 3)
    }
  },
  methods: {
    cesar(text, displacement){
      const LOWERCASE_LETTERS = 'abcdefghijklmnñopqrstuvwxyz'
      const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
      const NUMBERS = '0123456789'

      let result = ''
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if(LOWERCASE_LETTERS.indexOf(char) != -1){
          let index = LOWERCASE_LETTERS.indexOf(char) + displacement
          result += LOWERCASE_LETTERS[index % LOWERCASE_LETTERS.length]
        }else if(UPPERCASE_LETTERS.indexOf(char) != -1){
          let index = UPPERCASE_LETTERS.indexOf(char) + displacement
          result += UPPERCASE_LETTERS[index % UPPERCASE_LETTERS.length]
        }else if(NUMBERS.indexOf(char) != -1){
          let index = NUMBERS.indexOf(char) + displacement
          result += NUMBERS[index % NUMBERS.length]
        }else {
          result += char
        }
      }
      return result
    }
  }
}
</script>
