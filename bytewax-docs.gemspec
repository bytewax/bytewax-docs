# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "bytewax-docs"
  spec.version       = "0.1.0"
  spec.authors       = ["Konrad Sieńkowski"]
  spec.email         = ["konrad@sienkowski.eu"]

  spec.summary       = "Jekyll theme originally built for Bytewax docs."
  spec.homepage      = "https://docs.bytewax.io"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|tutorials/hello-world|_assets|_data|_docs|_includes|_layouts|_pages|_tutorials|LICENSE|README|.stylelintrc|gulpfile|package|package-lock|search|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"
end
