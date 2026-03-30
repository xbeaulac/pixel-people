<template>
  <div class="card-grid-content">
    <div class="card-grid">
      <Card v-for="nft in features" :key="nft.id" :nft="nft" :nfts="features" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import getCollection from "@/composables/getCollection";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { httpsCallable } from "@firebase/functions";
import { func } from "@/firebase/config";
import { onMounted, ref, toRaw, watch } from "@vue/runtime-core";
export default {
  components: { Card },
  props: ["collection", "query"],
  setup(props) {
    const { documents, error } = getCollection(props.collection, props.query);
    const { user } = getUser();
    const { document: userDoc } = getDocument("users", user.value.uid);
    const features = ref(null);

    watch(userDoc, async () => {
      if (userDoc.value && documents.value) {
        const choices = toRaw(userDoc.value.choices);
        console.log("choices from CardGrid:", choices);
        console.log("documents:", documents.value);
        const layerImage = httpsCallable(func, "layerImage");
        layerImage({
          choices: choices,
          shuffle: documents.value,
        }).then((result) => {
          console.log("result", result.data);
          features.value = result.data;
        });
      }
    });

    return { features };
  },
};
</script>

<style scoped>
.card-grid-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.4rem;
  padding: 3.2rem;
}
</style>
