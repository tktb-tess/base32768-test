<script lang="ts">
  import { onMount } from 'svelte';
  import { compressString } from './lib/convert';
  let text = $state('');
  let compressed = $state('');
  let id: ReturnType<typeof setTimeout> | null = null;

  onMount(() => {
    Object.defineProperty(window, 'compressString', {
      value: compressString,
      enumerable: true,
    });
  });
</script>

<textarea
  bind:value={
    () => text,
    (_t) => {
      text = _t;

      if (id != null) {
        clearTimeout(id);
      }

      id = setTimeout(async () => {
        compressed = await compressString(text);
        id = null;
      }, 1000);
    }
  }
></textarea>

<textarea value={compressed}></textarea>
