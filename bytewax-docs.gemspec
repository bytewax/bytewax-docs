# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "bytewax-docs"
  spec.version       = "0.1.0"
  spec.authors       = ["Konrad Sieńkowski"]
  spec.email         = ["konrad@sienkowski.eu"]

  spec.summary       = "Documentation theme based on Bytewax website."
  spec.homepage      = "https://docs.bytewax.io"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"
end
