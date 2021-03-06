/*
  This is a helper module that allows us to ensure that TinyMCE core is included/compiled
  before mcagar loads. This ensures that the core of the editor isn't loaded from pre-built
  files in node_modules and is always the latest version.
 */
import 'tinymce';
export * from '@ephox/mcagar';
