<template>
  <section>
    <form>
      <div class="primeiroSelect">
        <p class="textInicial">Filtrar por</p>

        <select name="opcao" v-model="selecionado" @change="removerIguais">
          <option value="" selected>Escolha uma opção</option>
          <option value="region">Região</option>
          <option value="capital">Capital</option>
          <option value="lang">Língua</option>
          <option value="name">País</option>
          <option value="callingcode">Código de ligação</option>
        </select>
      </div>

      <div v-show="selecionado" class="primeiroSelect">
        <p class="textInicial">{{ selecionado }}</p>

        <select name="filtro" v-if="selecionado === 'name'" v-model="valor">
          <option
            v-for="(item, index) in paises"
            :key="index"
            :value="item.name"
          >
            {{ item.name }}
          </option>
        </select>

        <select
          name="filtro"
          v-else-if="selecionado === 'lang'"
          v-model="valor"
        >
          <option
            v-for="(item, index) in paises"
            :key="index"
            :value="item.languages[0].iso639_1"
          >
            {{ item.languages[0].name }}
          </option>
        </select>

        <select
          name="filtro"
          v-else-if="selecionado === 'callingcode'"
          v-model="valor"
        >
          <option
            v-for="(item, index) in paises"
            :key="index"
            :value="item.callingCodes"
          >
            {{ item.callingCodes[0] }}
          </option>
        </select>

        <select
          name="filtro"
          v-else-if="selecionado === 'capital'"
          v-model="valor"
        >
          <option
            v-for="(item, index) in paises"
            :key="index"
            :value="item.capital"
          >
            {{ item.capital }}
          </option>
        </select>

        <select
          name="filtro"
          v-else-if="selecionado === 'region'"
          v-model="valor"
        >
          <option v-for="(item, index) in region" :key="index" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <button class="btn" @click.prevent="pesquisarPaises">Pesquisar</button>
    </form>

    <transition>
      <ul class="listaPaises">
        <li v-for="(item, index) in limitarQuantidadePaises" :key="index">
          <router-link
            class="selectBandeira"
            tag="button"
            :to="{ name: 'PageSelection', params: { pais: item.name } }"
          >
            <img :src="item.flag" :alt="item.name" />
          </router-link>
        </li>
      </ul>
    </transition>
    <Footer :paisesFiltrados="paisesFiltrados" :paisesPage="paisesPage" />
  </section>
</template>

<script>
import { api } from "@/services.js";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Footer,
  },
  data() {
    return {
      selecionado: "",
      valor: "",
      paisesFiltrados: [],
      paisesPage: 10,
      paises: [],
      region: [],
      nfoot: 5,
    };
  },
  computed: {
    limitarQuantidadePaises() {
      return this.paisesFiltrados.slice(
        (this.$store.state.paginaAtual - 1) * this.paisesPage,
        this.$store.state.paginaAtual * this.paisesPage
      );
    },
  },
  methods: {
    removerIguais() {
      const ArrayComIguais = [];
      return this.paises.map((item) => {
        ArrayComIguais.push(item[this.selecionado]);
        this[this.selecionado] = new Set(ArrayComIguais);
        console.log(this[this.selecionado]);
      });
    },
    puxarPaises() {
      api.get().then((r) => {
        this.paises = r.data;
        this.paisesFiltrados = this.paises;
      });
    },

    pesquisarPaises() {
      api
        .get(`https://restcountries.com/v2/${this.selecionado}/${this.valor}`)
        .then((r) => {
          this.paisesFiltrados = r.data;
          this.$store.state.paginaAtual = 1;
        });
    },
  },
  mounted() {
    this.puxarPaises();
  },
};
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem;
  width: 820px;
}
.textInicial {
  color: var(--color-background-button);
  font-size: 15px;
  font-family: var(--font-principal);
  border: none;
}

select {
  border: none;
  border-bottom: 1px solid #a8a8a8;
  color: var(--secondary-color);
  font-family: var(--font-principal);
  width: 220px;
  background: none;
}

select option {
  font-weight: bold;
  font-size: 14px;
  color: var(--secondary-color);
}

.btn {
  background: var(--color-background-button);
  border: none;
  cursor: pointer;
  font-size: 15px;
  color: white;
  padding: 10px 50px;
  border-radius: 12px;
}

.listaPaises {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
}

.selectBandeira {
  background: none;
  border: none;
  cursor: pointer;
  margin: 1rem;
}

.selectBandeira img {
  width: 250px;
  height: 150px;
}

@media (max-width: 700px) {
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  form div {
    margin-bottom: 1rem;
  }
  select {
    width: 300px;
  }
  .listaPaises {
    grid-template-columns: 1fr 1fr;
  }
  .listaPaises {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .btn {
    margin-top: 10%;
    margin-left: 50%;
  }

  .textInicial {
    margin-top: 10%;
  }
}
</style>
