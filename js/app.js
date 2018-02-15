$(document).ready(function(){

	// $(".box-coletar-peso-edital").hide();

	function estaVazio(string){
		switch(string){
			case true:
			case "0":
			case 0:
			case null:
			return true;
			default:
			return false;
		}
	}

	// var string="";

	// // console.log(string.length);

	// console.log(estaVazio(!string.length));

	var i = 3;

	$(".btn-add-disciplina").click(function(){

		var selecaoTipo = "<select class='tag-selecao-tipo' required>" +
							  "<option value='' disabled selected>Tipo</option>" + 
							  "<option value='Basica'>Básica</option>" +
							  "<option value='Espec'>Específica</option>" +
							"</select>"

		var div_InputSelectIndividual =  $(document.createElement("div"));
		
		div_InputSelectIndividual.attr("class", "individual-input_sel-discipl");
		
		
		var input_Discipl =  $(document.createElement("input"));

		input_Discipl.attr("id", "input-" + i);
		input_Discipl.attr("class", "input-disciplina");

		
		$(input_Discipl).appendTo(div_InputSelectIndividual);
		$(selecaoTipo).appendTo(div_InputSelectIndividual);
		
		$(".todos-inputs-disciplinas").append(div_InputSelectIndividual);

		i++;
	});

	var temPesoEdital;

	$("#btn-sim").click(function(){
		$(".box-calcular-peso-edital").hide();
		$(".box-coletar-peso-edital").fadeIn();

		temPesoEdital = true;
	})

	$("#btn-nao").click(function(){
		$(".box-coletar-peso-edital").hide();
		$(".box-calcular-peso-edital").fadeIn();

		temPesoEdital = false;
	})

	// Fim



	
	// var disciplinas;

	var listaDisciplinasBasicas = [];
	var listaDisciplinasEspec = [];
	var listaTodasDisciplinas = [];

	var pesoIndivBasicas;
	var pesoIndivEspec;

	var somaTotalPesoTres = 0;



	// ETAPA 1 — PESO EDITAL
	

	$("#btn-concl-etapa1").one("click", function(){ // Executa 

		$(".individual-input_sel-discipl").each(function(){ 
			var disciplinas = {};
			var nomeDisciplina = $(this).find(':input').val();
			var tipoDisciplina = $(this).find('select').val();
			var haElementoVazio = false;
			

			disciplinas.nomeDisciplina = nomeDisciplina;


			// if (estaVazio(!nomeDisciplina.length)){
			// 	haElementoVazio = true;
			// }

			// console.log(disciplinas)

			// console.log(!($(this).find(':input').val()).length);

			if (tipoDisciplina == "Basica"){
				disciplinas.tipo = "Básica";
				listaDisciplinasBasicas.push(disciplinas);
			} else if (tipoDisciplina == "Espec") {
				disciplinas.tipo = "Específica";
				listaDisciplinasEspec.push(disciplinas);
			}

			// if (!haElementoVazio){
				
			// } else{
			// 	alert("Há algo errado.")
			// 	return false;
			// }

			
			
		});

		listaTodasDisciplinas = listaDisciplinasBasicas.concat(listaDisciplinasEspec);

		// console.log(listaTodasDisciplinas);

		console.log("Botao sim: " + temPesoEdital)

		if (temPesoEdital){
			var pesoEditalBasicas = parseFloat($("#peso-edital-basicas").val());
			var pesoEditalEspec = parseFloat($("#peso-edital-espec").val());
			
			console.log(pesoEditalBasicas)

			$(listaTodasDisciplinas).each(function(index, value){
				if (this.tipo == "Básica"){
					this.pesoEdital = pesoEditalBasicas;
				} else if (this.tipo == "Específica"){
					this.pesoEdital = pesoEditalEspec;
				}
			});

		} else{
			var qtdDisciplinasBasicas = listaDisciplinasBasicas.length;
			var qtdDisciplinasEspec = listaDisciplinasEspec.length;

			var qtdQuestBasicas = parseInt($("#qtd-quest-basicas").val());
			var qtdQuestEspec = parseInt($("#qtd-quest-espec").val());
			var qtdQuestTotal = (qtdQuestBasicas + qtdQuestEspec);
			
			var pesoGeralBasicas = (qtdQuestBasicas/qtdQuestTotal);
			var pesoGeralEspec = (qtdQuestEspec/qtdQuestTotal);

			pesoIndivBasicas = (pesoGeralBasicas/qtdDisciplinasBasicas);
			pesoIndivEspec = (pesoGeralEspec/qtdDisciplinasEspec);

			$(listaTodasDisciplinas).each(function(index, value){
				if (this.tipo == "Básica"){
					this.pesoEdital = pesoIndivBasicas;
				} else if (this.tipo == "Específica"){
					this.pesoEdital = pesoIndivEspec;
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
				selecaoDificuldade + "</p>"
				);	
	
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

				this.pesoTres = (this.pesoEdital * this.pesoPessoal);

				somaTotalPesoTres += pesoTres;

			});

			somaTotalPesoTres = (somaTotalPesoTres * 100);

			
			// console.log(listaTodasDisciplinas);
		


			// ETAPA 3 — MONTAGEM DO QUADRO


			$("#btn-ir-etapa3").click(function(){
				var qtdHorasSemanais = parseFloat($("#qtd-horas-semanais").val())
				var qtdMinutosSecao = parseFloat($("#qtd-minutos-secao").val())
				
				var qtdCompartimento = ((60/qtdMinutosSecao)*qtdHorasSemanais);
				
				var equivPesoeCompart = parseFloat((qtdCompartimento/somaTotalPesoTres).toFixed(1));
				
				// console.log(equivPesoeCompart);

				

				// console.log(listaTodasDisciplinas);

				$.each(listaTodasDisciplinas, function(index, valor){

					var numCompartFinal = 0;

					numCompartFinal = listaTodasDisciplinas[index].
					pesoFinal * equivPesoeCompart;

					listaTodasDisciplinas[index].numCompartSemanal = numCompartFinal;
				})

				console.log(listaTodasDisciplinas);
			})


		})

		

	}); // Fim da div principal


	


	
	

	



});

