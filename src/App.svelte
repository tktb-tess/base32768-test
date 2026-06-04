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
    <div>
      <label for="plain">Text</label>
      <p>{text.length * 16} bits</p>
      <textarea
        id="plain"
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
    </div>
    <div>
      <label for="compressed">deflate-raw/base32768</label>
      <p>{compressed.length * 16} bits</p>
      <textarea id="compressed" readonly>{compressed}</textarea>
    </div>
  </div>
</main>

<style>
  main {
    max-width: 1280px;
    margin-inline: auto;
    padding-inline: 1rem;
    display: flow-root;
    border-inline: solid 1px var(--color-border);
  }

  textarea {
    border-radius: 6px;
    border: solid 1px var(--color-border);
    padding: 4px;
    resize: none;
    font-family: monospace;
  }

  .textarea-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(480px, 100%), 1fr));
    gap: 4px;
    min-height: 100lvh;
    margin: 1rem;

    > * {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    > * > * {
      display: block;
    }

    label,
    p {
      text-align: center;
    }

    textarea {
      height: 480px;
    }
  }
</style>
