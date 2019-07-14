import {FormControl} from '@angular/forms';

/*
    Criado por Clémerson Medeiros no dia 14/07/2019
    
*/

export class ValidateCPF{
    
    // Valda CPF
    static validCPF(control: FormControl){
        const cpf = control.value.replace(/[^\w\s]/gi, '').trim();
    
        if (cpf) {
          let numbers, digits, sum, i, result;
          
    
          // Verifica quantidade de caracteres
          if (cpf.length < 11) { 
            return { cpfNotValid: true };
          }
    
          // Verifica quantidade de dígitos iguais
          let equalDigits = 1;
          for (i = 0; i < cpf.length - 1; i++) {
            if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
              equalDigits = 0;
              break;
            }
          }
          if (equalDigits) {
            return { cpfNotValid: true };
          }
    
          // Calcula CPF
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    
          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;
    
          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    
          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return null;
        } else{
          return { cpfNotValid: true };
        }
    } 
}
