$(document).ready(function(){

	// INÍCIO DAS FUNÇÕES

	function formatarNumero(valor){ return valor.replace(",", ".") }
	function ehNumero(valor){ return isNaN(Number(formatarNumero(valor))) ? false : true; }

	function validarInputESelect(str_nomeClasse){
		var valido;

		$(str_nomeClasse).each(function(index, value){
			var inputs = $(this).find(':input').val();
			var selects = $(this).find('select').val();

			if(!inputs.length || (selects == null)){ 
				valido = false;
				return false;
			
			} else{ valido = true; }
		}) 

		return valido;
	}

	function validarInputNumerico(str_nomeClasse){
		var valido;
		
		$(str_nomeClasse).each(function(index, value){
			var inputs = $(this).val();

			if (!ehNumero(inputs) || !inputs.length){
				valido = false;
				return false;
				
			} else{ valido = true; }
		})	

		return valido;
	}

	function validarEtapa1(){

		var inputsNumericosValidos;

		var inputESelectValidos = validarInputESelect(".individual-input_sel-discipl");

		if(boxColetarPesoEscolhido){
			inputsNumericosValidos = 
			validarInputNumerico(".box-coletar-peso-edital .input-numerico")
		} else { 
			inputsNumericosValidos = 
			validarInputNumerico(".box-calcular-peso-edital .input-numerico") 
		}

		console.log("input numero validos: " + inputsNumericosValidos)
		console.log("input e select validos: " + inputESelectValidos)

		return (inputESelectValidos && inputsNumericosValidos) ? true : false; 
	}
	

	function validarEtapa3(){

		var inputsNumericosValidos = 
		validarInputNumerico(".box-coletar-numeros-tempo .input-numerico");

		console.log(inputsNumericosValidos);

		return inputsNumericosValidos ? true : false;
	}

	// FIM DAS FUNÇÕES
	



	var i = 3;

	$("#btn-add-disciplina").click(function(){

		var selecaoTipo = "<select class='tag-selecao-tipo' required>" +
							  "<option value='' disabled selected>Tipo</option>" + 
							  "<option value='Basica'>Básica</option>" +
							  "<option value='Espec'>Específica</option>" +
							"</select>"

		var div_InputSelectIndividual =  $(document.createElement("div"));
		div_InputSelectIndividual.attr("class", "individual-input_sel-discipl");
		
		var input_Discipl =  $(document.createElement("input"));
		div_InputSelectIndividual.attr("id", "input-select-" + i);
		input_Discipl.attr("class", "input-disciplina");

		$(input_Discipl).appendTo(div_InputSelectIndividual);
		$(selecaoTipo).appendTo(div_InputSelectIndividual);
		
		$(".todos-inputs-disciplinas").append(div_InputSelectIndividual);

		i++;

	});

	$("#btn-remover").click(function(){

		if(i == 3){
			alert("Desculpe, não é mais possível apagar.")
			return false;
		}
		
		i--;

		$("#input-select-" + i).remove()

	});

	

	var boxColetarPesoEscolhido;
	

	$("#btn-sim").click(function(){
		$(".box-calcular-peso-edital").hide();
		$(".box-coletar-peso-edital").fadeIn();

		$(".btn-etapa1").fadeIn();

		boxColetarPesoEscolhido = true;
	})

	$("#btn-nao").click(function(){
		$(".box-coletar-peso-edital").hide();
		$(".box-calcular-peso-edital").fadeIn();

		$(".btn-etapa1").fadeIn();

		boxColetarPesoEscolhido = false;
	})



	var listaDisciplinasBasicas = [];
	var listaDisciplinasEspec = [];
	var listaTodasDisciplinas = [];

	var somaTotalPesoFinal = 0;


	
	
	// INÍCIO - ETAPA 1
	
	$("#btn-concl-etapa1").click(function(){ // Executa 

		prosseguir = validarEtapa1();

		if (prosseguir){

			$(".individual-input_sel-discipl").each(function(){ 
				var disciplinas = {};
				var nomeDisciplina = $(this).find(':input').val();
				var tipoDisciplina = $(this).find('select').val();

				disciplinas.nomeDisciplina = nomeDisciplina;

				if (tipoDisciplina == "Basica"){
					disciplinas.tipo = "Básica";
					listaDisciplinasBasicas.push(disciplinas);
				} else if (tipoDisciplina == "Espec") {
					disciplinas.tipo = "Específica";
					listaDisciplinasEspec.push(disciplinas);
				}
			});

			listaTodasDisciplinas = listaDisciplinasBasicas.concat(listaDisciplinasEspec);

			// console.log(listaTodasDisciplinas);

			if (boxColetarPesoEscolhido){
				var pesoEditalBasicas = parseFloat(formatarNumero($("#peso-edital-basicas").val()))
				var pesoEditalEspec = parseFloat(formatarNumero($("#peso-edital-espec").val()));

				// console.log(pesoEditalBasicas)

				$(listaTodasDisciplinas).each(function(index, value){
					if (this.tipo == "Básica"){
						this.pesoEdital = Math.abs(pesoEditalBasicas.toFixed(1));
					} else if (this.tipo == "Específica"){
						this.pesoEdital = Math.abs(pesoEditalEspec.toFixed(1));
					}
				});

			} else{
				var qtdDisciplinasBasicas = listaDisciplinasBasicas.length;
				var qtdDisciplinasEspec = listaDisciplinasEspec.length;

				var qtdQuestBasicas = parseInt($("#qtd-quest-basicas").val());
				var qtdQuestEspec = parseInt($("#qtd-quest-espec").val());
				var qtdQuestTotal = (qtdQuestBasicas + qtdQuestEspec);
				
				var proporcaoBasicas = (qtdQuestBasicas/qtdQuestTotal);
				var proporcaoEspec = (qtdQuestEspec/qtdQuestTotal);

				pesoCalculadoBasicas = Math.abs(proporcaoBasicas/qtdDisciplinasBasicas);
				pesoCalculadoEspec = Math.abs(proporcaoEspec/qtdDisciplinasEspec);

				$(listaTodasDisciplinas).each(function(index, value){
					if (this.tipo == "Básica"){
						this.pesoEdital = (pesoCalculadoBasicas * 100).toFixed(1);
					} else if (this.tipo == "Específica"){
						this.pesoEdital = (pesoCalculadoEspec * 100).toFixed(1);
					}
				});
			}

			// console.log(listaTodasDisciplinas);

			var selecaoDificuldade = "<select class='tag-selecao'>" +
				  "<option value='1'>1 - Muito Baixo</option>" +
				  "<option value='1.5'>1,5 - Baixo</option>" +
				  "<option value='2'>2 - Médio</option>" +
				  "<option value='2.5'>2,5 - Alto</option>" +
				  "<option value='3'>3 - Muito Alto</option>" +
				"</select>";
			
			$.each(listaTodasDisciplinas, function(index, valor){
				$(".questionamento-dificuldade").append("<p>" + this.nomeDisciplina + ": " + 
					selecaoDificuldade + "</p>");	
			}); 

			$("#conteudo-secundario-etapa1").hide();
			$("#conteudo-secundario-etapa2").fadeIn();

			$("#indicacao-etp1").attr("src", "img/v-check.png")
			$("#reticencias-etp-2").hide();
			$("#href-etp1").attr("href", "#etapa2")
		
		}else { alert("Parece que há algo errado e/ou incompleto. Por gentileza, revise essa primeira etapa.") }
	
	}); // FIM - ETAPA 1

	
		

	// INÍCIO - ETAPA 2

	$("#btn-concl-etapa2").click(function(){

		$.each($(".tag-selecao"), function(index, valor){

			listaTodasDisciplinas[index].
			pesoPessoal = parseFloat($(valor).val());
		});

		// console.log(listaTodasDisciplinas);

		// CALCULO E INSERÇÃO DO PESO FINAL E SUA SOMA
		
		$.each(listaTodasDisciplinas, function(index, valor){
			
			var pesoFinal = 0;

			pesoFinal = (this.pesoEdital * this.pesoPessoal);

			this.pesoFinal = (pesoFinal).toFixed(1);

			somaTotalPesoFinal += pesoFinal;
		}); 

		$("#conteudo-secundario-etapa2").hide();
		$("#conteudo-secundario-etapa3").fadeIn();

		$("#indicacao-etp2").attr("src", "img/v-check.png")
		$("#reticencias-etp-3").hide();
		$("#href-etp2").attr("href", "#etapa3")
	}); // FIM - ETAPA 2

	

	// INÍCIO - ETAPA 3 

	$("#btn-mostrar-resultado").click(function(){

		var prosseguir = validarEtapa3();

		if (prosseguir){
			var qtdHorasSemanais = parseFloat(Math.abs($("#qtd-horas-semanais").val()));
			var qtdMinutosSecao = parseFloat(Math.abs($("#qtd-minutos-secao").val()));
			var qtdMinutosIntervalo = parseFloat(Math.abs($("#qtd-minutos-intervalo").val()));
			
			var qtdCompartimento = Math.round((60/(qtdMinutosSecao + qtdMinutosIntervalo))*qtdHorasSemanais);
			
			var equivPesoeCompart = parseFloat((qtdCompartimento/(somaTotalPesoFinal * 100)) * 100);

			$.each(listaTodasDisciplinas, function(index, valor){
				var numCompartFinal = 0;

				numCompartFinal = this.pesoFinal * equivPesoeCompart;

				this.numCompartSemanal = numCompartFinal;
			})
			

			
			// INÍCIO DO RESULTADO FINAL

			var tabelaPrincipal = $("#tabela-principal");

			$(listaTodasDisciplinas).each(function(index, valor){
				
				var tr = $("<tr></tr>").appendTo(tabelaPrincipal);

				$("<td></td>").text(this.nomeDisciplina).appendTo(tr);
				$("<td></td>").text(this.tipo).appendTo(tr);
				$("<td></td>").text(this.pesoEdital).appendTo(tr);
				$("<td></td>").text(this.pesoPessoal).appendTo(tr);
				$("<td></td>").text(this.pesoFinal).appendTo(tr);
				$("<td></td>").text(Math.round(this.numCompartSemanal)).appendTo(tr);
			})

			$("#conteudo-secundario-etapa3").hide();
			$("#conteudo-secundario-resultado").fadeIn();

			$("#indicacao-etp3").attr("src", "img/v-check.png");
			$("#indicacao-resultado").attr("src", "img/flag-check.png");
			$("#reticencias-etp-resultado").hide();
			$("#href-etp3").attr("href", "#etapa-resultado");

			var disciplinaNomeEx = listaTodasDisciplinas[0].nomeDisciplina;
			var disciplinaSessoesEx = Math.round(listaTodasDisciplinas[0].numCompartSemanal);

			$("#dscpl-nome-ex").append(disciplinaNomeEx);
			$("#dscpl-sessoes-ex").append(disciplinaSessoesEx + " sessões");
			$("#duracao-sessao-ex").append(qtdMinutosSecao + " minutos");
			$("#intervalo-descanso-ex").append(qtdMinutosIntervalo + " minutos");
			$("#horas-semanais-ex").append(qtdHorasSemanais + " horas");

			$("#btn-ver-detalhes").click(function(){
				
				$("#td-horas-semanais").append(qtdHorasSemanais);
				$("#td-duracao-secao").append(qtdMinutosSecao);
				$("#td-duracao-intervalo").append(qtdMinutosIntervalo);
				$("#td-total-compart").append(qtdCompartimento);
				$("#td-soma-peso-final").append(somaTotalPesoFinal.toFixed(1));
				$("#td-relacao-peso-compart").append(equivPesoeCompart.toFixed(1));

				$(".detalhes-calculo-conteudo").fadeIn();
				$("#btn-ver-detalhes").hide();
			})

		} else{
			alert("Parece que há algo errado e/ou incompleto. Por gentileza, revise essa terceira etapa.")
		}

	}) // FIM - ETAPA 3
});

