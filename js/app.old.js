$(document).ready(function(){


	function adicionarInput(tipoDisciplina, contador){

		var input_Individual =  $(document.createElement("input"));
		
		input_Individual.attr("id", "input-" + contador);
		input_Individual.attr("class", "input-disciplina-" + tipoDisciplina);

		$(".div-inputs-disciplinas-" + tipoDisciplina).append(input_Individual);
	}




	// Inserção de <input> de acordo com o tipo da disciplina

	var i = 2;
	var u = 2;

	$(".btn-add-disciplina-basica").click(function(){

		adicionarInput("basicas", i);
		i++;
		
	});

	$(".btn-add-disciplina-espec").click(function(){

		adicionarInput("espec", u);
		u++;
		
	});

	// Fim
	

	// Etapa pelo do edital

	// var listaDisciplinasBasicas;
	// var listaDisciplinasEspec;
	// var listaTodasDisciplinas;

	$("#ok").click(function(){

		var listaDisciplinasBasicas = [];
		var listaDisciplinasEspec = [];

		$(".input-disciplina-basicas").each(function(){ 
			listaDisciplinasBasicas.push(this.value); 
		});

		$(".input-disciplina-espec").each(function(){ 
			listaDisciplinasEspec.push(this.value); 
		});


		var qtdDisciplinasBasicas = listaDisciplinasBasicas.length;
		var qtdDisciplinasEspec = listaDisciplinasEspec.length;

		// console.log(listaDisciplinasBasicas);
		// console.log(listaDisciplinasEspec);


		var qtdQuestBasicas = parseInt($("#qtd-quest-basicas").val());
		var qtdQuestEspec = parseInt($("#qtd-quest-espec").val());
		var qtdQuestTotal = (qtdQuestBasicas + qtdQuestEspec);
		
		var pesoGeralBasicas = (qtdQuestBasicas/qtdQuestTotal);
		var pesoGeralEspec = (qtdQuestEspec/qtdQuestTotal);

		var pesoIndivBasicas = (pesoGeralBasicas/qtdDisciplinasBasicas);
		var pesoIndivEspec = (pesoGeralEspec/qtdDisciplinasEspec);
		
		$(".resultado-pesos").html("Peso básicas: " + pesoIndivBasicas + "<br>" +
			"Peso Específicas: " + pesoIndivEspec
			);	


		

		//Etapa Peso Pessoal

		var selecaoDificuldade = "<select class='tag-selecao'>" +
			  "<option value='1'>1 - Baixa</option>" +
			  "<option value='1.5'>1,5</option>" +
			  "<option value='2'>2 - Média</option>" +
			  "<option value='2.5'>2,5</option>" +
			  "<option value='3'>3 - Alta</option>" +
			"</select>";

		var listaTodasDisciplinas = listaDisciplinasBasicas.concat(listaDisciplinasEspec);
		var listaPesoPessoal = [];
		
		$.each(listaTodasDisciplinas, function(index, valor){
			$(".questionamento").append("<p> Qual a sua dificuldade na disciplina " 
				+ valor + "?  " + selecaoDificuldade + "</p>");
				
		});

		var listaPesoFinal = [];

		$("#ok2").click(function(){

			$.each($(".tag-selecao"), function(index, valor){
				listaPesoPessoal.push(parseFloat($(valor).val()));
				
			});

			// console.log(listaPesoPessoal);
			
			$.each(listaPesoPessoal, function(index, valor){
				listaPesoFinal.push(
					listaPesoPessoal[index] * pesoIndivBasicas
					);
			});

			console.log(listaPesoFinal);
			
		});
	});
});

var teste = "OI"

var disciplinas = {
	teste: {
		tipo: "Basica",
		pesoEdital: 6.9,
		pesoPessoal: 2,
		// pesoFinal: (pesoEdital * pesoPessoal)
	},
	"Matemática":{
		tipo: "Basica",
		pesoEdital: 6.9,
		pesoPessoal: 2,
	}
}

console.log(disciplinas);