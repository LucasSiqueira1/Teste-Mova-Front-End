<template>
  <section>
    <transition>
      <ul
        v-for="(PageSelection, index) in informacao"
        :key="index"
        class="paisSelected"
      >
        <img
          class="imagemPais"
          :src="PageSelection.flag"
          :alt="PageSelection.name"
        />

        <div class="info">
          <li>Nome: {{ PageSelection.translations.br }}</li>
          <li>Capital: {{ PageSelection.capital }}</li>
          <li>
            Região:
            <router-link
              :to="{ path: `/` }"
              :valores="`${PageSelection.region}`"
            >
              {{ PageSelection.region }}
            </router-link>
          </li>

          <li v-for="(item, index) in puxarFronteira" :key="index">
            <router-link
              class="btnBandeira"
              tag="button"
              :to="{ name: PageSelection.region, params: { pais: item.name } }"
            >
              <img :src="item.flag" :alt="item.name" />
            </router-link>
          </li>

          <li>Sub-região: {{ PageSelection.subregion }}</li>
          <li>População: {{ PageSelection.population }}</li>

          <li>
            Línguas:
            <span
              v-for="(idiomas, index) in PageSelection.languages"
              :key="index"
            >
              {{ idiomas.nativeName }}
            </span>
          </li>
        </div>
      </ul>
    </transition>

    <div>
      <p>Países Vizinhos</p>
      <p></p>
      <ul class="paisesBandeira">
        <li
          v-for="(paisFronteira, index) in quantidadePaisesVizinhos"
          :key="index"
        >
          <router-link
            :to="{
              name: 'PageSelection',
              params: { pais: paisFronteira.name },
            }"
            @click.native="$router.go()"
          >
            <img :src="paisFronteira.flag" :alt="paisFronteira.name" />
          </router-link>
        </li>
      </ul>
    </div>

    <Footer :paisesBandeira="paisesBandeira" :paisesPage="paisesPage" />
  </section>
</template>

<script>
import { api } from "@/services.js";
import Footer from "@/components/Footer.vue";

export default {
  name: "PageSelection",
  components: {
    Footer,
  },
  data() {
    return {
      informacao: null,
      siglas: null,
      paisesBandeira: [],
      paisesFiltrados: [],
      paisesPage: 12,

      valores: null,
    };
  },
  mounted() {
    this.puxarPaises(),
      api
        .get(`https://restcountries.com/v2/name/${this.$route.params.pais}`)
        .then((r) => {
          this.informacao = r.data;
          this.siglas = r.data[0].borders;
          this.puxarFronteira();
        });
  },
  computed: {
    quantidadePaisesVizinhos() {
      return this.paisesBandeira.slice(
        (this.$store.state.paginaAtual - 1) * this.paisesPage,
        this.$store.state.paginaAtual * this.paisesPage
      );
    },
  },
  methods: {
    puxarPaises() {
      api.get().then((r) => {
        this.paises = r.data;
        this.paisesFiltrados = this.paises;
      });
    },

    puxarFronteira() {
      this.siglas.forEach((item) => {
        api.get(`https://restcountries.com/v2/alpha/${item}`).then((r) => {
          this.paisesBandeira.push(r.data);
          this.totalPaises = this.paisesBandeira.length;
        });
      });
    },

    //https://restcountries.com/v2/region/Asia
    /*pesquisarPaises() {
      api.get(`https://restcountries.com/v2/region/Asia`).then((r) => {
        this.paisesFiltrados = r.data;
        this.$store.state.paginaAtual = 1;
      });
    },*/
  },
};
</script>

<style scoped>
section {
  max-width: 1000px;
}
.paisSelected {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
  font-family: var(--font-principal);
}

.paisSelected div {
  line-height: 30px;
}

a {
  text-decoration: underline;
}

li {
  color: black;
}

.imagemPais {
  margin-top: 10px;
  width: 440px;
  height: 250px;
  filter: drop-shadow(1px 5px 4px rgba(0, 0, 0, 0.4));
}

p {
  margin-left: 20px;
  margin-top: 40px;
  font-size: 20px;
}

.paisesBandeira li img {
  margin: 1rem;
  filter: drop-shadow(1px 4px 4px rgba(0, 0, 0, 0.4));
  width: 250px;
  height: 150px;
}

.paisesBandeira {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
}

@media (max-width: 640px) {
  .paisesBandeira {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .paisSelected {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .paisSelected img {
    margin-bottom: 1rem;
  }

  .paisSelected div {
    align-self: flex-start;
  }
  .imagemPais {
    width: 90%;
  }
}
</style>
