## Convert-Fiorilli
Projeto que realiza a conversão dos dados presente no retorno da api disponibilizada pela empresa **[Fiorilli](https://fiorilli.com.br/)**.

## Como Funciona?
Esse converssor realizar a tranformação dos dados de retorno do *endpoint* de uma api para planilhas do excel. A princípio, tal função seria simples... 📍mas📍 estamos falando aqui, dos dados de uma cidade inteira, então temos diversos campos sendo retornados em diversas **[arrays]** e **[sub arrays]**. Tal fator dificultou a criação dessa primeira versão.

## Popular Tabela 
Primeiro, foi necessário a criação de uma tabela, vazia, somente com seus respectivos headers. Após a inicialização da tabela, vamos *popular* a mesma: 

<br />

> Adicona uma *row* única de cada lote na tabela. Ela será nosso *guia*, por ela encontraremos onde adicionar a informação 😉.
~~~ JavaScript
$('.table > tbody').append(
  `<tr id="${idLote}"></tr>`
);
~~~

<br />

> Logo após adicionar a nossa row, vamos popular a tabela toda! Vale ressaltar, as informações devem estar em sequência, ou seja, elas devem ser *adicionadas na tabela de forma sequêncial*
~~~ JavaScript
//setor
$(`#${idLote}`).append(
    `<td class="text-center td-table"> ${this.setor_end != '' ? this.setor_end : 'VAZIO'} </td>`
);

//quadra
$(`#${idLote}`).append(
    `<td class="text-center td-table"> ${this.quadra_end != '' ? this.quadra_end : 'VAZIO'} </td>`
);

... and goes
~~~

<br />

> Como acessamos as sublistas? utilizamos o seletor self *this*. Ele é responsável por acessar as sublistas do próprio elemento. 
~~~ JavaScript
$.each(this.enderecos, function() {   
    if (this.tipo_endereco == 0) {
        //código do bairro
        $(`#${idLote}`).append(
            `<td class="text-center td-table"> ${this.cod_bai_end != '' ? this.cod_bai_end : 'VAZIO'} </td>`
        );

        //nome do bairro
        $(`#${idLote}`).append(
            `<td class="text-center td-table"> ${this.bairro_end != '' ? this.bairro_end.toUpperCase() : 'VAZIO'} </td>`
        );
    }
});
~~~

<br />

>> **NOTA:** alguns acessos de sub arrays podem ser mais complexos do que os acesso simples, pois precissamos anular algumas condições dentro de outras condições. 
Aqui usamos a rodo os ```if()``` ternários. Bassicamente, eles ```?``` *(faz isso)*, ```:``` *(se não, faz isso aqui)*

## Componentes 
Foram utilizados alguns componentes criados especiamentes para o desenvolvimento de aplicações web.

<div align="center">
  
  |  Components  | that |  was   |      used     |
  |--------|-------------|-----------|-----------|
  | **[Jquery](https://jquery.com/)** | **[DataTable](https://datatables.net/)**   | **[Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/)**   | **[font-awesome](https://fontawesome.com/icons)** |
  
</div>  

## Importante 
As nomenclaturas utilizadas para definir os campos na api, são diferentes da que utilizamos na **[Egati Engenharia](https://egati.com.br/)**. Portanto, foi necessário a análise da corresondia de cada campo de acordo com seus dados. 
Desta forma, foi possivel mandar cada retorno da api para seu campo especifico! 

<div align="center">

 | Campos                                  | Campos Retorno    | Condições                                                                                 | Definição                                                                                                                                                                              |
|-----------------------------------------|-------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| setor                                   | setor_end         |                                                                                           | setor onde o lote se localiza.                                                                                                                                                         |
| quadra                                  | quadra_end        |                                                                                           | quadra onde o lote se localiza.                                                                                                                                                        |
| lote                                    | lote_end          |                                                                                           | número do lote na prefeitura.                                                                                                                                                          |
| referencia quadra                       | não possui        |                                                                                           | uma referecia para aquela quadra (ex: Quadra das Acácias) - dificilmente tem dados                                                                                                     |
| referencia do lote                      | não possui        |                                                                                           | uma referecia para aquele lote (ex: Lote de Comércio)  - dificilmente tem dados                                                                                                        |
| referencia da unidade                   | não possui        |                                                                                           | uma referecia para aquela unidade - imóvel (ex: Imovel perto de tal lugar)                                                                                                             |
| cod cad ímovel                          | cod_cad_ipt       |                                                                                           | código único, utilizado como identificação pela prefeitura - (ex: 10001000)  - importante                                                                                              |
| número do imóvel                        | numero_end        | tipo_endereco == 0 [corresponde ao endereo do lote em si]                                 | número do endereço do imóvel, da localização, pode conter letras e número (ex: N° 564A)                                                                                                |
| código do compromissario                | cod_prop          | principal_prop == 'S' && this.tipo_prop == 2 [corresponde aos dados compromissario]       | código do compromissario...  - dificilmente tem dados                                                                                                                                  |
| código do logradouro                    | cod_log_end       | tipo_endereco == 0 [corresponde ao endereco do lote em si]                                | código do logradouro onde o lote esta localizado...                                                                                                                                    |
| complemento endereço                    | comple_end        | tipo_endereco == 0 [corresponde ao endereco do lote em si]                                | uma descrição do complemento do endereço (ex: Perto da Igreja Santa Rita)  - dificilmente tem dados                                                                                    |
| código do bairro                        | cod_bai_end       | tipo_endereco == 0 [corresponde ao endereco do lote em si]                                | código do bairro onde o lote esta localizado.                                                                                                                                          |
| nome do bairro                          | bairro_end        | tipo_endereco == 0 [corresponde ao endereco do lote em si]                                | nome do bairro onde o lote está localizado.                                                                                                                                            |
| cep do lote                             | cep_end           | tipo_endereco == 0 [corresponde ao endereco do lote em si]                                | cep do lote...                                                                                                                                                                         |
| data de registro                        | dta_inc_ipt       |                                                                                           | data em que aquele lote foi registrado na prefeitura.  - dificilmente tem dados                                                                                                        |
| utilidade ímovel                        | não possui        |                                                                                           | para que aquele imovel é utilizado. Geralmente os imóveis de propriedade da prefeitura, possuem por exemplo, "casa do adolescente", "centro comunitário"....  - dificilmente tem dados |
| topografia                              | não possui        |                                                                                           | a topografia do imóvel - dificilmente tem dados                                                                                                                                        |
| podologia                               | não possui        |                                                                                           | a podologia do imóvel - dificilmente tem dados                                                                                                                                         |
| isenção                                 | não possui        |                                                                                           | campo para verificar se aquele cadastro, possui isenção de iptu                                                                                                                        |
| área do lote                            | areter_ipt        |                                                                                           | área total do lote.                                                                                                                                                                    |
| testada principal                       | medida_tes        | descricao_tes == 'PRINCIPAL' [corresponde a testada principal]                            | valor correspondete a testada principal.                                                                                                                                               |
| testada secundaria                      | não possui        |                                                                                           | valor correspondete a testada secundaria.  - dificilmente tem dados                                                                                                                    |
| área edificação                         | não possui        |                                                                                           | valor correspondente a área da edificação principal dentro do lote - entende se por principal, o imóvel que detem da maior área dentro do lote - dificilmente tem dados                |
| total das áreas edificadas              | totareas_edif_ipt |                                                                                           | total das áreas de todos os imóveis dentro do lote.                                                                                                                                    |
| telefone                                | não possui        |                                                                                           | referente ao telefone do proprietário.  - dificilmente tem dados                                                                                                                       |
| nome proprietário                       | nome_cnt          | principal_prop == 'S' && tipo_prop == 1 [corresponde aos dados do proprietário principal] | nome do proprietário do lote.                                                                                                                                                          |
| cnpj                                    | cnpj_cnt          | principal_prop == 'S' && tipo_prop == 1 [corresponde aos dados do proprietário principal] | cnpj do propeitário do lote                                                                                                                                                            |
| rg                                      | rg_cnt            | principal_prop == 'S' && tipo_prop == 1 [corresponde aos dados do proprietário principal] | rg do propeitário do lote                                                                                                                                                              |
| nome compromissario                     | nome_cnt          | principal_prop == 'S' && this.tipo_prop == 2 [corresponde aos dados compromissario]       | nome do compromissario...                                                                                                                                                              |
| código do logradouro - correspondencia  | cod_log_end       | tipo_endereco == 1 [corresponde ao endereco dde correspondecia]                           | ....  - importante                                                                                                                                                                     |
| nome do logradouro - correspondencia    | logra_end         | tipo_endereco == 1 [corresponde ao endereco dde correspondecia]                           | ....  - importante                                                                                                                                                                     |
| numero do endereco - correspondencia    | numero_end        | tipo_endereco == 1 [corresponde ao endereco dde correspondecia]                           | ....  - importante                                                                                                                                                                     |
| complemento - correspondencia           | comple_end        | tipo_endereco == 1 [corresponde ao endereco dde correspondecia]                           | ....  - importante                                                                                                                                                                     |
| código do bairro - correspondencia      | cod_bai_end       | tipo_endereco == 1 [corresponde ao endereco dde correspondecia]                           | ....  - importante                                                                                                                                                                     |
| nome do bairro - correspondencia        | bairro_end        | tipo_endereco == 1 [corresponde ao endereco dde correspondecia]                           | ....  - importante                                                                                                                                                                     |
| estado do endereco - correspondencia    | uf_cid            | tipo_endereco == 1 [corresponde ao endereco dde correspondecia]                           | ....  - importante                                                                                                                                                                     |
| cidade - correspondencia                | nome_cid          | tipo_endereco == 1 [corresponde ao endereco dde correspondecia]                           | ....  - importante                                                                                                                                                                     |
| cep - correspondencia                   | cep_end           | tipo_endereco == 1 [corresponde ao endereco dde correspondecia]                           | ....  - importante                                                                                                                                                                     |
| valor venal do lote                     | vvterrit_ihc      |                                                                                           | ....  - importante                                                                                                                                                                     |
| valor venal do predio                   | vvedif_ihc        |                                                                                           | ....  - importante                                                                                                                                                                     |
| situação cadastral                      | descri_dcr        | descri_crt == 'Situação' [corresponde a situação do lote na prefeitura]                   | a situação do lote, se está ok, irregular, etc...                                                                                                                                      |
| matricula                               | matricula_ipt     |                                                                                           | matricula do imóvel                                                                                                                                                                    |
| zoneamento                              | descri_dcr        | descri_crt == 'ZONEAMENTO' [corresponde ao zoneamento onde o lote se localiza]            | a zona onde o lote está localizado                                                                                                                                                     |
| tipo unidade                            | descri_edf        |                                                                                           | referente ao tipo de imovel dentro do lote, se é um prédio, se é uma edificação principal...                                                                                           |
</div>


[❗]                                            [❗]
- Att
Adicionado tela de gerar dados dos imóveis. Essa tela gera os dados dos imóveis de forma separada. Sendo necessário o agrupamento das mesmas.
<br />

Foi adicionado uma nova pagina de pesquisa de dados dos imóveis separadamente, ela retorna apena o `ID_LOTE`, `ID_IMOVEL`, `INSCRICAO_LOTE` e `AREA_IMOVEL`. Posteriormente essa planilha será utilizada para fazer a atualização dos ID dos imóveis. 


