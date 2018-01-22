class Ocorrencia {
  /** This is a description of the foo function. */
  constructor(){
    this.situacao = "PENDENTE"
  }
  public data: Date;
  public dp_id: string;
  public veiculo_id: string;
  public localOcorrencia: string;
  public numeroOcorrencia: string;
  public observacoes: string;
  public situacao: string = 'PENDENTE';
  public tipo: Tipo;
  public tipo_id: string;
  public veiculo: Veiculo;
  public dp: Dp;
  public id: string;
}

class Tipo{
  constructor(){

  }

  public descricao: string
  public id: string
}

class Veiculo {
    constructor(
    ){}

    public ano: string;
    public chassis: string;
    public cor: string;
    public numeroMotor: string;
    public placa: string;
    public proprietario_id: string;
    public tipo: string;
    public proprietario: Proprietario;
    public id: string;
}

class Dp {
  constructor(
  ){}
  public id: string;
  public nome: string;
}

class Proprietario{
  constructor(
  ){}
  public nome: string;
  public contato: string;
  public id: string;
}

export {Ocorrencia, Dp, Veiculo, Proprietario, Tipo}
