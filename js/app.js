$(document).ready(function(){

	function formatarNumero(input){ return input.replace(",", ".") }
	function ehNumero(input){ return isNaN(Number(formatarNumero(input))) ? false : true; }

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

	// var objTeste = {
	// 	nome: "disciplina",
	// 	tipo: "tipo",
	// 	pesoedital: "pesoedital",
	// 	pesopessoal: "pesopessoal",
	// 	pesofinal: "pesofinal",
	// 	secoes: "secoes"
	// }

	// var listaTeste = [objTeste, objTeste]

	// console.log(listaTeste)


	// $("#btn-teste").click(function(){
	// })

	// var tabelaPrincipal = $("#tabela-teste");

	// $(listaTeste).each(function(index, valor){
		
	// 	var tr = $("<tr></tr>").appendTo(tabelaPrincipal);

	// 	$("<td></td>").text(this.nome).appendTo(tr);
	// 	$("<td></td>").text("Text222333.").appendTo(tr);
	// 	$("<td></td>").text("4").appendTo(tr);

	// 	console.log("loop")
	// })

	








	
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
			alert("Desculpe, não é possível apagar mais.")
			return false;
		}
		
		

		console.log("remover" + i)

		i--;

		$("#input-select-" + i).remove()

	});

	var boxColetarPesoEscolhido;
	

	$("#btn-sim").click(function(){
		$(".box-calcular-peso-edital").hide();
		$(".box-coletar-peso-edital").fadeIn();

		$("#btn-concl-etapa1").show();

		boxColetarPesoEscolhido = true;
	})

	$("#btn-nao").click(function(){
		$(".box-coletar-peso-edital").hide();
		$(".box-calcular-peso-edital").fadeIn();

		$("#btn-concl-etapa1").show();

		boxColetarPesoEscolhido = false;
	})

	// Fim


	var listaDisciplinasBasicas = [];
	var listaDisciplinasEspec = [];
	var listaTodasDisciplinas = [];

	var pesoIndivBasicas;
	var pesoIndivEspec;

	var somaTotalPesoTres = 0;


	
	var inputsNumericosValidos;

	




	// $("#btn-teste").click(function(){
	// 	console.log("coletar: " + boxColetarPesoEscolhido)

	// 	var inputESelectValidos = validarInputESelect(".individual-input_sel-discipl");

	// 	if(boxColetarPesoEscolhido){
	// 		inputsNumericosValidos = 
	// 		validarInputNumerico(".box-coletar-peso-edital .input-numerico")
	// 	} else { 
	// 		inputsNumericosValidos = 
	// 		validarInputNumerico(".box-calcular-peso-edital .input-numerico") 
	// 	}

	// 	console.log("input numero validos: " + inputsNumericosValidos)
	// 	console.log("input e select validos: " + inputESelectValidos)

	// 	if(inputESelectValidos && inputsNumericosValidos){ // Dados válidos. Prossiga...
	// 		console.log("Tudo válido!")
	// 	}else{
	// 		console.log("Há algo inválido") // Dados inválidos. Revise.
	// 	}
	// })
	
	
	


	// ETAPA 1 — PESO EDITAL
	

	$("#btn-concl-etapa1").one("click", function(){ // Executa 

		$(".individual-input_sel-discipl").each(function(){ 
			var disciplinas = {};
			var nomeDisciplina = $(this).find(':input').val();
			var tipoDisciplina = $(this).find('select').val();
			var haElementoVazio = false;

			console.log(tipoDisciplina);

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

		console.log("Botao sim: " + boxColetarPesoEscolhido)

		if (boxColetarPesoEscolhido){
			var pesoEditalBasicas = parseFloat(formatarNumero($("#peso-edital-basicas").val()))
			var pesoEditalEspec = parseFloat(formatarNumero($("#peso-edital-espec").val()));

			console.log(pesoEditalBasicas)

			$(listaTodasDisciplinas).each(function(index, value){
				if (this.tipo == "Básica"){
					this.pesoEdital = pesoEditalBasicas.toFixed(1);
				} else if (this.tipo == "Específica"){
					this.pesoEdital = pesoEditalEspec.toFixed(1);
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

			pesoCalculadoBasicas = (proporcaoBasicas/qtdDisciplinasBasicas);
			pesoCalculadoEspec = (proporcaoEspec/qtdDisciplinasEspec);

			$(listaTodasDisciplinas).each(function(index, value){
				if (this.tipo == "Básica"){
					this.pesoEdital = (pesoCalculadoBasicas * 100).toFixed(1);
				} else if (this.tipo == "Específica"){
					this.pesoEdital = (pesoCalculadoEspec * 100).toFixed(1);
				}
			});
		}

		console.log(listaTodasDisciplinas);


		$(".resultado-pesos").html("Peso básicas: " + pesoIndivBasicas + "<br>" +
			"Peso Específicas: " + pesoIndivEspec
			);	

		// $(".conteudo-secundario-etapa2").fadeIn(800);

		// console.log(listaTodasDisciplinas)

		var selecaoDificuldade = "<select class='tag-selecao'>" +
			  "<option value='1'>1 - Baixa</option>" +
			  "<option value='1.5'>1,5</option>" +
			  "<option value='2'>2 - Média</option>" +
			  "<option value='2.5'>2,5</option>" +
			  "<option value='3'>3 - Alta</option>" +
			"</select>";
		
		$.each(listaTodasDisciplinas, function(index, valor){
			$(".questionamento-dificuldade").append("<p>" + this.nomeDisciplina + ": " + 
				selecaoDificuldade + "</p>");	
		}); 

	}); // FIM ETAPA 1

	
		

	// ETAPA 2 — PESO PESSOAL

	$("#btn-concl-etapa2").click(function(){

		$.each($(".tag-selecao"), function(index, valor){

			listaTodasDisciplinas[index].
			pesoPessoal = parseFloat($(valor).val());
			
		});

		console.log(listaTodasDisciplinas);

		// CALCULO E INSERÇÃO DO PESO FINAL E SUA SOMA
		
		$.each(listaTodasDisciplinas, function(index, valor){
			var pesoTres = 0;

			pesoTres = (this.pesoEdital * this.pesoPessoal);

			this.pesoFinal = (pesoTres).toFixed(1);

			somaTotalPesoTres += pesoTres;

		}); 
	});

	

	// ETAPA 3 — MONTAGEM DO QUADRO

	$("#btn-mostrar-resultado").click(function(){
		var qtdHorasSemanais = parseFloat($("#qtd-horas-semanais").val())
		var qtdMinutosSecao = parseFloat($("#qtd-minutos-secao").val())
		
		var qtdCompartimento = ((60/qtdMinutosSecao)*qtdHorasSemanais);
		
		var equivPesoeCompart = parseFloat((qtdCompartimento/(somaTotalPesoTres * 100)) * 100);
		
		console.log("soma total: " + equivPesoeCompart);

		

		// console.log(listaTodasDisciplinas);

		$.each(listaTodasDisciplinas, function(index, valor){
			var numCompartFinal = 0;

			numCompartFinal = this.pesoFinal * equivPesoeCompart;

			this.numCompartSemanal = numCompartFinal;
		})

		console.log(listaTodasDisciplinas);
	

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

			console.log("loop")
		})


		$("#td-horas-semanais").append(qtdHorasSemanais);
		$("#td-duracao-secao").append(qtdMinutosSecao);
		$("#td-total-compart").append(qtdCompartimento);
		$("#td-soma-peso-final").append(somaTotalPesoTres.toFixed(1));
		$("#td-relacao-peso-compart").append(equivPesoeCompart.toFixed(1));

















	}) // FIM ETAPA 3


	










});

