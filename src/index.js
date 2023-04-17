$(document).ready(function () {
    hideloading();
    hideTable();
    let token;
    let xhr;
    let settings = $('#openSetting');
    let searchData = $("#searchData");

    settings.click(function() {
        if (localStorage.getItem('token')) {
            token = localStorage.getItem('token'); 
            $('#token-text').val(token); 
        }
        //console.log($(this), searchData.hasClass('btn-imovel'));
    })

    searchData.click(function() {
        $('#openSettings, .modal-backdrop').delay(100).fadeOut(1150);
        showloading();
        destroyTable();

        let limit = $('#qtde-registro').val() != '' ? $('#qtde-registro').val() : 50;
        let offset = $('#qtde-ignorar').val() != '' ? $('#qtde-ignorar').val() : 0;
        token = $('#token-text').val()  != '' ? $('#token-text').val() : 0;


        if (token == 0) {
            if (localStorage.getItem('token')) {
                token = localStorage.getItem('token'); 
            } else {
                token = 0;
                Swal.fire({
                    icon: 'error',
                    title: 'Erro no Token',
                    text: 'Não foi encontrado nenhum Token de Acesso!',
                });
                
                hideloading();
                xhr.abort();
            }
        } else {
            localStorage.setItem('token', token);
        }

        configureTable()

        xhr = $.ajax({
            type: 'GET',
            url: `https://homologacao.fiorilli.app/api/sia/imobiliario/imoveis?limit=${limit}&offset=${offset}&sort=cod_ipt,asc&fields=rural_ipt,eq,N&listall=S`,
            data: [],
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${token.trim()}`);            
            },
            success: function (data) {
                const convertedJson = data;
                
                //flag para verificar de qual pagina veio o click
                if(searchData.hasClass('btn-imovel') === true) {
                    let idLote; 

                    $.each(convertedJson.data, function() { 
                        idLote = this.cod_ipt;

                        $('.table > tbody').append(
                            `<tr id="${idLote}"></tr>`
                        );

                        //sequencial
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table text-primary fw-bold"> ${idLote != '' ? idLote : 'VAZIO'} </td>`
                        );
                
                        //inscricao
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${this.cod_cad_ipt != '' ? this.cod_cad_ipt : 'VAZIO'} </td>`
                        );

                        //codigo da unidade
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table" id="cod-imovel-${idLote}"> ${''} </td>`
                        );

                        $(`#${idLote}`).append(
                            `<td class="text-center td-table" id="area-imovel-${idLote}"> ${''} </td>`
                        );

                        $.each(this.edificadas, function() {
                            //verifica se é edificação agregada
                            if (this.principal_edf == 'S') {
                                $(`#cod-imovel-${idLote}`).append(`<span class="text-primary fw-bold">${this.cod_edf}</span>`);                                               
                                $(`#area-imovel-${idLote}`).append(`<span class="text-danger fw-bold">${this.medida_edf}</span>`);                                               
                            }
                            // if (this.principal_edf != 'S') {
                            //     $(`#cod-imovel-${idLote}`).append(`, <strong> agregado: </strong><span class="text-primary fw-bold">${this.cod_edf}</span>, área=<span class="text-danger fw-bold">${this.medida_edf}</span>`);                                               
                            // } 
                        });

                        // if(!this.hasOwnProperty("edificadas")) {
                        //     $(`#cod-imovel-${idLote}`).append(`<span class="text-primary fw-bold">SEM EDIFICACAO</span>`);
                        // }
                    }) 
                } else {
                    let idLote;
                    let codCompromissario = 0;
                    let nomeCompromissario;
                    let situacaoCadastro;
                    let tipoEdificacao;
                    let valorVenalPredio;
                    let valorVenalTerreno;
                    let descLoteamento;

                    let codLogCorrespondencia; 
                    let logCorrespondencia;
                    let numCorrespondencia;
                    let compleCorrespondencia;
                    let codBairCorrespondencia;
                    let bairCorrespondencia;
                    let ufCorrespondencia;
                    let cidadeCorrespondencia;
                    let cepCorrespondencia;  

                    $.each(convertedJson.data, function() {  
                        situacaoCadastro = '';
                        tipoEdificacao = '';
                        codLogCorrespondencia = ''; 
                        logCorrespondencia = '';
                        numCorrespondencia = '';
                        compleCorrespondencia = '';
                        codBairCorrespondencia = '';
                        bairCorrespondencia = '';
                        ufCorrespondencia = '';
                        cidadeCorrespondencia = '';
                        cepCorrespondencia = '';

                        //counting 
                        //seq++;
                        seq = 0;

                        //da ao lote uma identificação única, para gerar uma "row" única
                        idLote = this.cod_ipt;

                        $('.table > tbody').append(
                            `<tr id="${idLote}"></tr>`
                        );
                        // debugger;
                        //sequencial
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table text-primary fw-bold"> ${idLote != '' ? idLote : 'VAZIO'} </td>`
                        );
                
                        //setor
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${this.setor_end != '' ? this.setor_end : 'VAZIO'} </td>`
                        );
                
                        //quadra
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${this.quadra_end != '' ? this.quadra_end : 'VAZIO'} </td>`
                        );
                
                        //lote
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${this.lote_end != '' ? this.lote_end : 'VAZIO'} </td>`
                        );            
                    
                        //referencia do quadra 
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${'VAZIO'} </td>`
                        );
                
                        //referencia de lote
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${'VAZIO'} </td>`
                        );

                        //referencia da unidade
                        $(`#${idLote}`).append(
                            `<td class="text-start td-table" id="cod-area-${idLote}"> ${''} </td>`
                        );

                        //tipo de unidade
                        $.each(this.edificadas, function() {
                            //verifica se é edificação agregada
                            if (this.principal_edf == 'S') {
                                $(`#cod-area-${idLote}`).append(`<strong>principal</strong>:[cod=<span class="text-primary fw-bold">${this.cod_edf}</span>, área=<span class="text-danger fw-bold">${this.medida_edf}</span>]`);                                               
                            }
                            if (this.principal_edf != 'S') {
                                $(`#cod-area-${idLote}`).append(`, <strong>agregado</strong>:[cod=<span class="text-primary fw-bold">${this.cod_edf}</span>, área=<span class="text-danger fw-bold">${this.medida_edf}</span>]`);                                               
                            } 
                        });
                
                        //cod cad imovel (unico)
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table text-primary fw-bold"> ${this.cod_cad_ipt != '' ? this.cod_cad_ipt : 'VAZIO'} </td>`
                        );
                        
                        //numero do lote 
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${this.numero_end != '' ? this.numero_end : 'VAZIO'} </td>`
                        );

                        //código do compromissario
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table" id="codigo-compromissario-${idLote}"> ${'VAZIO'} </td>`
                        );
                
                        //código logradouro
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${this.cod_log_end != '' ? this.cod_log_end : 'VAZIO'} </td>`
                        );
                
                        //tipo de logradouro 
                        $(`#${idLote}`).append(
                            //data um id para depois usar ele para adicionar o valor do tipo de logradouro
                            `<td class="text-center td-table" id="tipo-logradouro-lote-${idLote}">${'VAZIO'}</td>`
                        );
                
                        //nome logradouro
                        $(`#${idLote}`).append(
                            `<td class="text-start td-table"> ${this.logra_end != '' ? this.logra_end.toUpperCase()  : 'VAZIO'} </td>`
                        );
                
                        //complemento endereço 
                        $(`#${idLote}`).append(
                            //data um id para depois usar ele para adicionar o valor do complemento
                            `<td class="text-center td-table" id="complemento-endereco-lote-${idLote}">${'VAZIO'}</td>`
                        );

                        $.each(this.enderecos, function() {   
                            if (this.tipo_endereco == 0) {
                                //código do bairro
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${this.cod_bai_end != '' ? this.cod_bai_end : 'VAZIO'} </td>`
                                );

                                //nome do bairro
                                $(`#${idLote}`).append(
                                    `<td class="text-start td-table"> ${this.bairro_end != '' ? this.bairro_end.toUpperCase() : 'VAZIO'} </td>`
                                );

                                //cep do lote 
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${this.cep_end != '' ? this.cep_end : 'VAZIO'} </td>`
                                );

                                //pega o tipo de logradouro e joga no id especifico
                                $(`#tipo-logradouro-lote-${idLote}`).html(`${this.titulolog_end != null ? this.titulolog_end : 'VAZIO'}`);

                                //pega o complemento e joga no id especifico
                                $(`#complemento-endereco-lote-${idLote}`).html(`${this.comple_end != '' ? this.comple_end : 'VAZIO'}`);

                                //pega a descricao do loteamento e envia lá para baixo
                                descLoteamento = `${this.descri_lto != null ? this.descri_lto : 'VAZIO'}`;
                            }
                        });
                
                        //data de registro
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${this.dta_inc_ipt != '' ? this.dta_inc_ipt  : 'VAZIO'} </td>`
                        );
                        
                        //utilidade imovel 
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${'VAZIO'} </td>`
                        );
                
                        //topografia 
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${'VAZIO'} </td>`
                        );
                
                        //podologia 
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${'VAZIO'} </td>`
                        );
                        
                        //insencao 
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${'VAZIO'} </td>`
                        ); 
                        
                        //area do lote 
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${this.areter_ipt != '' ? this.areter_ipt : 'VAZIO'} </td>`
                        );   
                
                        //testada principal e secundaria
                        $.each(this.testadas, function() {       
                
                            if (this.descricao_tes == 'PRINCIPAL') {
                                //testada
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${this.medida_tes != '' ? this.medida_tes : '0'} </td>`
                                );
                            } else {
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${'VAZIO'} </td>`
                                );   
                            }  
                            
                            if (this.descricao_tes != 'PRINCIPAL') {
                                //testada
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${this.medida_tes != '' ? this.medida_tes : '0'} </td>`
                                );
                            }  else {
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${'VAZIO'} </td>`
                                );   
                            } 
                        });
                
                        //área edificação
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${'VAZIO'} </td>`
                        );
                
                        //área total das edificações 
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${this.totareas_edif_ipt != '' ? this.totareas_edif_ipt : 'VAZIO'} </td>`
                        );
                
                        //telefone do proprietário
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${'VAZIO'} </td>`
                        );
                
                        //proprietários 
                        $.each(this.proprietarios, function() {
                
                            //checa se é proprietário principal
                            if ((this.principal_prop == 'S') && (this.tipo_prop == 1)) {
                                //nome proprietário
                                $(`#${idLote}`).append(
                                    `<td class="text-start td-table"> ${this.nome_cnt != '' ? this.nome_cnt : 'VAZIO 2'} </td>`
                                );
                
                                //cnpj proprietário 
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${this.cnpj_cnt != '' ? this.cnpj_cnt : 'VAZIO 3'} </td>`
                                );
                
                                //rg proprietário
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${this.rg_cnt != '' ? this.rg_cnt : 'VAZIO 4'} </td>`
                                );

                                nomeCompromissario = '';
                                codCompromissario = '';
                            }    
                            
                            //se for compromissário
                            if ((this.principal_prop == 'S') && (this.tipo_prop == 2)) {
                                nomeCompromissario = this.nome_cnt; 
                                codCompromissario = this.cod_prop;
                                $(`#codigo-compromissario-${idLote}`).html(`${codCompromissario != '' ? codCompromissario : 'VAZIO'}`);
                            }  
                        });                        

                        //nome do compromissário
                        $(`#${idLote}`).append(
                            `<td data-find="${idLote}" class="text-center td-table"> ${nomeCompromissario != '' ? nomeCompromissario : 'VAZIO 4'} </td>`
                        );

                        if (this.enderecos.length > 1) {
                            //endereços
                            $.each(this.enderecos, function() {            
                                if (this.tipo_endereco == 0) {
                                    codLogCorrespondencia = ''; 
                                    logCorrespondencia = '';
                                    numCorrespondencia = '';
                                    compleCorrespondencia = '';
                                    codBairCorrespondencia = '';
                                    bairCorrespondencia = '';
                                    ufCorrespondencia = '';
                                    cidadeCorrespondencia = '';
                                    cepCorrespondencia = '';
                                }  

                                //endereço de envio de correspondência
                                if (this.tipo_endereco == 1) {
                                    codLogCorrespondencia = this.cod_log_end; 
                                    logCorrespondencia = this.logra_end;
                                    numCorrespondencia = this.numero_end;
                                    compleCorrespondencia = this.comple_end;
                                    codBairCorrespondencia = this.cod_bai_end;
                                    bairCorrespondencia = this.bairro_end;
                                    ufCorrespondencia = this.uf_cid;
                                    cidadeCorrespondencia = this.nome_cid;
                                    cepCorrespondencia = this.cep_end;
                                
                                    //código do logradouro
                                    $(`#${idLote}`).append(
                                        `<td class="text-center td-table"> ${codLogCorrespondencia != '' ? codLogCorrespondencia : 'VAZIO'} </td>`
                                    );

                                    //nome logradouro
                                    $(`#${idLote}`).append(
                                        `<td class="text-start td-table"> ${logCorrespondencia != '' ? logCorrespondencia.toUpperCase() : 'VAZIO'} </td>`
                                    );

                                    //número do endereço
                                    $(`#${idLote}`).append(
                                        `<td class="text-center td-table"> ${numCorrespondencia != '' ? numCorrespondencia : 'VAZIO'} </td>`
                                    );

                                    //complemento do endereço
                                    $(`#${idLote}`).append(
                                        `<td class="text-start td-table"> ${compleCorrespondencia != '' ? compleCorrespondencia : 'VAZIO'} </td>`
                                    );
                    
                                    //código do bairro do endereço
                                    $(`#${idLote}`).append(
                                        `<td class="text-center td-table"> ${codBairCorrespondencia != '' ? codBairCorrespondencia : 'VAZIO'} </td>`
                                    );

                                    //nome do bairro 
                                    $(`#${idLote}`).append(
                                        `<td class="text-start td-table"> ${bairCorrespondencia != '' ? bairCorrespondencia.toUpperCase() : 'VAZIO'} </td>`
                                    );
                    
                                    //estado do endereço
                                    $(`#${idLote}`).append(
                                        `<td class="text-center td-table"> ${ufCorrespondencia != '' ? ufCorrespondencia.toUpperCase() : 'VAZIO'} </td>`
                                    );
                    
                                    //nome da cidade 
                                    $(`#${idLote}`).append(
                                        `<td class="text-start td-table"> ${cidadeCorrespondencia != '' ? cidadeCorrespondencia.toUpperCase() : 'VAZIO'} </td>`
                                    );

                                    //cep do endereço
                                    $(`#${idLote}`).append(
                                        `<td class="text-center td-table"> ${cepCorrespondencia != '' ? cepCorrespondencia : 'VAZIO'} </td>`
                                    );  
                                } 
                            }); 
                            
                        } else {
                            if (this.enderecos[0].tipo_endereco == 0) {
                                //código do logradouro
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${codLogCorrespondencia != '' ? codLogCorrespondencia : 'VAZIO'} </td>`
                                );

                                //nome logradouro
                                $(`#${idLote}`).append(
                                    `<td class="text-start td-table"> ${logCorrespondencia != '' ? logCorrespondencia.toUpperCase() : 'VAZIO'} </td>`
                                );

                                //número do endereço
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${numCorrespondencia != '' ? numCorrespondencia : 'VAZIO'} </td>`
                                );

                                //complemento do endereço
                                $(`#${idLote}`).append(
                                    `<td class="text-start td-table"> ${compleCorrespondencia != '' ? compleCorrespondencia : 'VAZIO'} </td>`
                                );
                
                                //código do bairro do endereço
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${codBairCorrespondencia != '' ? codBairCorrespondencia : 'VAZIO'} </td>`
                                );

                                //nome do bairro 
                                $(`#${idLote}`).append(
                                    `<td class="text-start td-table"> ${bairCorrespondencia != '' ? bairCorrespondencia.toUpperCase() : 'VAZIO'} </td>`
                                );
                
                                //estado do endereço
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${ufCorrespondencia != '' ? ufCorrespondencia.toUpperCase() : 'VAZIO'} </td>`
                                );
                
                                //nome da cidade 
                                $(`#${idLote}`).append(
                                    `<td class="text-start td-table"> ${cidadeCorrespondencia != '' ? cidadeCorrespondencia.toUpperCase() : 'VAZIO'} </td>`
                                );

                                //cep do endereço
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${cepCorrespondencia != '' ? cepCorrespondencia : 'VAZIO'} </td>`
                                );                                               
                            }
                        }                        

                        //valores venal do lote
                        valorVenalTerreno = this.valorvenal[this.valorvenal.length-1].vvterrit_ihc;
                        valorVenalPredio = this.valorvenal[this.valorvenal.length-1].vvedif_ihc;

                        //valor venal do lote
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${valorVenalTerreno != '' ? parseFloat(valorVenalTerreno).toFixed(2)  : ' '} </td>`
                        );

                        //valor venal do prédio
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${valorVenalPredio != '' ? parseFloat(valorVenalPredio).toFixed(2)  : ' '} </td>`
                        ); 
                            
                        //valor venal do ímovel
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${' '} </td>`
                        );
                
                        //código do contribuinte 
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${'VAZIO'} </td>`
                        );
                
                        //número do contribuinte 
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${'VAZIO'} </td>`
                        );
                        
                        //situação cadastro
                        if (this.hasOwnProperty("cobrancas")) {
                            $.each(this.cobrancas, function() {                        
                                //pega a situação cadastral 
                                if ((this.dtfinal_cco == ' ') || (this.dtfinal_cco == null)) {
                                    $(`#${idLote}`).append(
                                        `<td class="text-center td-table"> ${this.descri_cob != '' ? this.descri_cob.toUpperCase() : 'VAZIO'} </td>`
                                    );
                                                                            
                                } 
                            });
                        } else {
                            $(`#${idLote}`).append(
                                `<td class="text-center td-table"> ${'VAZIO'} </td>`
                            );   
                        }

                        //matricula
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${this.matricula_ipt != '' ? this.matricula_ipt  : 'VAZIO'} </td>`
                        ); 
                
                        //zoneamento
                        $.each(this.caracteristicas, function() {                
                            //Zonemento
                            if (this.descri_crt == 'ZONEAMENTO') {
                
                                //descrição do Zoneamento
                                $(`#${idLote}`).append(
                                    `<td class="text-center td-table"> ${this.descri_dcr != '' ? this.descri_dcr : 'VAZIO'} </td>`
                                );                
                            }
                        });
                        
                        //loteamento
                        $(`#${idLote}`).append(
                            `<td class="text-center td-table"> ${descLoteamento} </td>`
                        );
                
                        //tipo de Unidade
                        $.each(this.edificadas, function() {
                            //verifica se é edificação principal
                            if (this.principal_edf == 'S') {
                                tipoEdificacao = this.descri_edf.toUpperCase();                                            
                            } 
                        });

                        //tipo de unidade
                        $(`#${idLote}`).append(
                            `<td class="text-start td-table"> ${tipoEdificacao != '' ? tipoEdificacao : 'VAZIO'} </td>`
                        );

                        // debugger;
                    })  
                }
            },
            erro: function (data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oopâ...',
                    text: 'Deu alguma coisa errada ai em!',
                });
                hideloading()
                hideTable();
                erroBuild();
            },
            complete: function(xhr, textStatus) {
                // console.log(xhr.status, textStatus)
                switch (xhr.status) {
                    case 0: {
                        swalError('Verifique sua conexão com a internet.');
                        break;                  
                    }
                    case 400: {
                        swalError('O servidor entendeu a solicitação, mas o conteúdo da solicitação era inválido.');
                        break;                  
                    } 
                    case 401: {
                        swalError('Acesso negado!');
                        break;
                    }
                    case 403: {
                        swalError('Recurso proibido não pode ser acessado.');
                        break;
                    }
                    case 404: {
                        swalError('A página requisitada não foi encontrada!');
                        break;
                    }
                    case 500: {
                        swalError('Erro interno no Servidor!');
                        break;
                    }
                    case 503: {
                        swalError('Serviço indisponível!');
                        break;   
                    }
                    default: {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Dados convertidos com Sucesso!',
                            showConfirmButton: false,
                            timer: 2000
                        }); 
                        buildTable();
                    }
                }                
            }
        });
    });
});

function configureTable() {
    $("table").addClass("compact nowrap w-100 table-striped table-hover table-bordered mb-3 table-body display nowrap");
    $("table > tbody > tr:first-child").remove();
}

function swalError(textMsg) {
    erroBuild();
    hideloading();
    Swal.fire({
        icon: 'error',
        title: 'Oopâ...',
        text: `${textMsg}`,
    });
}

function buildTable() {
    $('#table-to-export').DataTable({             
        dom: 'Bfrtip',
        buttons: {
            dom: {
                button: {
                    className: 'btn btn-primary mb-3'
                }
            },
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: 'Excel',
                    text:'<i class="fas fa-file-excel"></i>&nbsp;Exportar para Excel'
                }
            ],
        },
        language: {
            "info": "Mostrando _START_ de _END_ com total _TOTAL_ de dados.",
            "search": "Buscar:",
            "lengthMenu": "Mostrar _MENU_ resultados",
            "infoFiltered": "(filtrado de _MAX_)",
            "loadingRecords": "Carregando...",
            "processing": "Processando...",
            "emptyTable": "Nenhum dado encontrado!",
            "paginate": {
                "first":      "Primeiro",
                "last":       "Último",
                "next":       "Próximo",
                "previous":   "Anterior"
            }
        },
        ordering: false,
        scrollX: true,
        pageLength: 10,
        paginates: {
            dom: {
                paging: {
                    className: 'Page navigation example'
                }
            }
        }
    });
    hideloading();
    showTable();

    let cityName = $('#city-name').val();

    if (cityName == '') {
        $('#city-name-text').html('MUNICÍPIO NÃO ENCONTRADO');
    } else {
        $('#city-name-text').html('DADOS DO MUNICÍPIO DE ' + cityName.toUpperCase());   
    }
}

function showloading() {
    $('.lds-roller, .bg-overlay').show();
}

function hideloading() {
    $('.lds-roller, .bg-overlay').hide();
}

function hideTable() {
    $('.table-container').hide();
    $('.card-body').append(erroBuild());
}

function showTable() {    
    $('.table-container').show();
    $('.noData').remove();

    var table = $('#table-to-export').DataTable();
    table.columns.adjust().draw();
}

function erroBuild() {
    const text =
    `<div class="noData text-center text-white d-flex justify-content-center align-items-center">
        <div class="alert alert-danger col-10" role="alert">
            Não foram encontrados dados!
        </div>
    </div>`;

    return text;
}

function destroyTable() {
    if ($.fn.DataTable.isDataTable('#table-to-export')) {
        $('#table-to-export').DataTable().destroy();
    };
    $('#table-to-export tbody').empty();
}