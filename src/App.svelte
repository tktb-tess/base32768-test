<script lang="ts">
  import { onMount } from 'svelte';
  import { compressString, decompressString } from './lib/convert';
  let text = $state('');
  let compressed = $state('');
  let id: ReturnType<typeof setTimeout> | null = null;

  onMount(() => {
    Object.defineProperties(window, {
      compressString: {
        value: compressString,
        enumerable: true,
      },
      decompressString: {
        value: decompressString,
        enumerable: true,
      },
    });
  });
</script>

<main>
  <div class="textarea-container">
    <textarea
      bind:value={
        () => text,
        (_t) => {
          text = _t;

          if (id != null) {
            clearTimeout(id);
          }

          id = setTimeout(async () => {
            if (text) {
              compressed = await compressString(text);
            } else {
              compressed = '';
            }
            id = null;
          }, 1000);
        }
      }
    ></textarea>
    <textarea readonly>{compressed}</textarea>
  </div>
</main>

<style>
  main {
    max-width: 1280px;
    margin-inline: auto;
    display: flow-root;
  }

  textarea {
    border-radius: 6px;
    border: solid 1px var(--color-border);
    padding: 4px;
    resize: vertical;
  }

  .textarea-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
    gap: 4px;

    > * {
      display: block;
      height: 480px;
    }
  }
</style>
