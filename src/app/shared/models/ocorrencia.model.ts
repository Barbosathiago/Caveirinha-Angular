class Ocorrencia {
  constructor(
    public_id: string,
    rua: string,
    bairro: string,
    numero: string,
    dp: Dp,
    tipoOcorrencia: string,
    situacao: string,
    veiculo: Veiculo
  ){}
}

class Veiculo {
    constructor(
      public_id: string,
      placa: string,
      chassis: string,
      numeroMotor: string,
      cor: string,
      tipoVeiculo: string,
      descricao: string,
      nomeProprietario: string,
      telefoneProprietario: string
    ){}
}

class Dp {
  constructor(
    public_id: string,
    nome: string,
  ){}
}

export {Ocorrencia, Dp, Veiculo}
