"use strict";

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "fonts/**/*.{woff, woff2}",
            "img/**",
            "js/**"
          ],
          dest: "build"
        }]
      }
    },
    clean: {
      build: ["build"]
    },
    less: {
      style: {
        files: {
          "build/css/style.css": "source/less/style.less"
        }
      }
    },
    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        src: "build/css/*.css"
      }
    },
    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },
    svgstore: {
      options: {
        includeTitleElement: false
      },
      sprite: {
        files: {
          "build/img/sprite.svg": ["source/img/icon-*.svg"]
        }
      }
    },
    posthtml: {
      options: {
        use: [
          require("posthtml-include")()
        ]
      },
      html: {
        files: [{
          expand: true,
          cwd: "source",
          src: ["*.html"],
          dest: "build"
        }]
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html", "build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          watchTask: true
        }
      }
    },
    watch: {
      html: {
        files: ["source/*.html"],
        tasks: ["posthtml"]
      },
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "copy",
    "copy",
    "less",
    "postcss",
    "csso",
    "svgstore",
    "posthtml"
  ]);
};
