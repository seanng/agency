import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { serveDir } from 'https://deno.land/std@0.224.0/http/file_server.ts';

serve((req) => {
  return serveDir(req, {
    fsRoot: '.',
    showDirListing: true,
    enableCors: true,
  });
});
