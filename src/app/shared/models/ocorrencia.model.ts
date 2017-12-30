class Ocorrencia {
  constructor(
    public public_id: string = '',
    public rua: string,
    public bairro: string,
    public numero: string,
    public dp: Dp,
    public tipoOcorrencia: string,
    public situacao: string = 'PENDENTE',
    public veiculo: Veiculo,
  ){}
}

class Veiculo {
    constructor(
      public public_id: string = '',
      public placa: string,
      public chassis: string,
      public numeroMotor: string,
      public cor: string,
      public tipoVeiculo: string,
      public descricao: string,
      public nomeProprietario: string,
      public telefoneProprietario: string,
    ){}
}

class Dp {
  constructor(
    public public_id: string = '',
    public nome: string,
  ){}
}

export {Ocorrencia, Dp, Veiculo}
