class Ocorrencia {
  /** This is a description of the foo function. */
  constructor(
    public localOcorrencia: string,
    public numeroOcorrencia: string,
    public dp: Dp,
    public tipo: string,
    public situacao: string = 'PENDENTE',
    public veiculo: Veiculo,
    public data: Date,
    public observacoes?: string,
    public public_id?: string
  ){}
}

class Veiculo {
    constructor(
      public placa: string,
      public tipo: string,
      public proprietario: Proprietario,
      public chassis?: string,
      public numeroMotor?: string,
      public ano?: string,
      public cor?: string,
      public public_id?: string
    ){}
}

class Dp {
  constructor(
    public public_id: string = '',
    public nome: string
  ){}
}

class Proprietario{
  constructor(
    public nome: string,
    public contato: string,
    public public_id?: string
  ){}
}

export {Ocorrencia, Dp, Veiculo, Proprietario}
