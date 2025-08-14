export default function AboutUs() {

  return (
    <section className="py-20 mb-20">
      <h2 className="text-4xl md:text-5xl font-thin text-gray-800 mb-10 tracking-wide">
        关于我们
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg text-gray-600 font-light leading-relaxed mb-6">
            我们相信极简主义不仅是一种设计理念，更是一种生活态度。在喧嚣的世界中，我们选择用最纯粹的方式表达自己。
          </p>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            每一件T恤都经过精心挑选的面料和严格的工艺标准，确保穿着的舒适性和持久性。我们追求的不是短暂的时尚，而是永恒的经典。
          </p>
        </div>
        <div>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light text-gray-800 mb-3">品质承诺</h3>
              <p className="text-gray-600 font-light">
                100%有机棉材质，环保可持续，对肌肤友好
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light text-gray-800 mb-3">设计理念</h3>
              <p className="text-gray-600 font-light">
                去除一切多余，保留最本质的美
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light text-gray-800 mb-3">生产工艺</h3>
              <p className="text-gray-600 font-light">
                手工缝制，注重每一个细节的完美呈现
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}