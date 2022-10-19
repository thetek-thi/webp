sassfiles = $(wildcard sass/*.sass)
cssfiles  = $(sassfiles:sass/%.sass=style/%.css)


style/%.css: sass/%.sass
	sassc $< $@


all: $(cssfiles)

.PHONY: all

