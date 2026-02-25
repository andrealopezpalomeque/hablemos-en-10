import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'
import { config } from '../config/environment.js'
import type { Topic, TopicCategory } from '../types/index.js'

const genAI = new GoogleGenerativeAI(config.geminiApiKey)

const SYSTEM_PROMPT = `Sos un asistente creativo que genera temas de escritura para una mujer de 91 años de Corrientes, Argentina. Ella es maestra jubilada, viajó por todo el mundo, le encanta el baile, las artesanías y tiene opiniones fuertes sobre política, economía y la vida.

Ella está escribiendo un libro de ensayos — no memorias, sino sus OPINIONES y reflexiones sobre temas que le importan. Nació alrededor de 1934 y vivió toda la historia argentina: el peronismo, la dictadura militar, la vuelta a la democracia, la hiperinflación, la convertibilidad, el corralito, y la Argentina de hoy.

CONTEXTO CULTURAL DE CORRIENTES:
- Los carnavales correntinos (comparsas, corsos, murgas)
- El chamamé, la música litoraleña
- El río Paraná, los esteros del Iberá
- Las artesanías en cuero, plata y tejidos
- La yerba mate, el tereré
- Las fiestas patronales y tradiciones religiosas
- La gastronomía regional: chipá, mbejú, sopa paraguaya

SUS INTERESES:
- Educación: fue maestra, tiene mucho que decir sobre la escuela de antes y la de ahora
- Economía: el dólar, el dinero, el trabajo, cómo cambió todo
- Política: opiniones sobre políticos argentinos e internacionales, las leyes, el gobierno
- Tradiciones: carnavales correntinos, fiestas populares, costumbres, tradiciones religiosas
- Arte: artesanías que ella hace, danza, música, cantantes que le gustan, películas
- Viajes: conoció muchos países y puede comparar culturas
- Familia: su hija, sus nietos, ser madre, ser abuela, los vínculos
- Corrientes: su ciudad, el río Paraná, la costanera, la gente, el día a día correntino
- Tecnología: cómo cambió el mundo, el antes y el ahora, la comunicación, los aparatos
- Naturaleza: plantas, flores, jardines, el campo, el clima, el paisaje
- Personajes: realeza (reinas de Inglaterra, Letizia de España), figuras famosas, gente que admira o que ve en la tele

INSTRUCCIONES:
- Generá UN tema de escritura con sus palabras clave y preguntas guía
- Las preguntas deben provocar OPINIÓN, no solo recuerdos. Usá "¿Qué opinás...?", "¿Qué pensás...?", "¿Estás de acuerdo con...?"
- Usá español argentino (voseo: "vos", "opinás", "pensás", "creés")
- El tono debe ser cálido, respetuoso y estimulante
- Las palabras clave deben ser concretas y evocadoras, entre 4 y 6
- Generá exactamente 3 preguntas guía

Las categorías válidas son: "educacion", "economia", "politica", "tradiciones", "arte", "viajes", "familia", "corrientes", "tecnologia", "naturaleza", "personajes".`

const CATEGORY_HINTS: Record<TopicCategory, string> = {
  educacion: 'Generá un tema sobre educación, la escuela, los maestros o la enseñanza.',
  economia: 'Generá un tema sobre economía, el dólar, el dinero, el trabajo o los precios.',
  politica: 'Generá un tema sobre política, políticos, leyes o el gobierno.',
  tradiciones: 'Generá un tema sobre tradiciones: carnavales correntinos, fiestas populares o costumbres.',
  arte: 'Generá un tema sobre artesanías, danza, música, cantantes o películas.',
  viajes: 'Generá un tema sobre viajes, lugares del mundo o comparaciones entre culturas.',
  familia: 'Generá un tema sobre la familia: ser madre, ser abuela, los nietos, los vínculos.',
  corrientes: 'Generá un tema sobre Corrientes: la ciudad, el río, la costanera, la gente, el día a día.',
  tecnologia: 'Generá un tema sobre tecnología: cómo cambió el mundo, el antes y el ahora, la comunicación.',
  naturaleza: 'Generá un tema sobre la naturaleza: plantas, flores, jardines, el campo o el clima.',
  personajes: 'Generá un tema sobre personajes famosos: realeza, figuras públicas o gente que admira.',
}

export async function generateTopic(
  category?: TopicCategory,
  completedTopics?: string[],
): Promise<Topic> {
  let userPrompt = category
    ? CATEGORY_HINTS[category]
    : 'Generá un tema de escritura interesante de cualquier categoría.'

  if (completedTopics && completedTopics.length > 0) {
    userPrompt += `\n\nIMPORTANTE: La escritora ya completó estos temas, así que generá uno DIFERENTE:\n- ${completedTopics.join('\n- ')}`
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          topic: { type: SchemaType.STRING },
          keywords: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          questions: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          category: { type: SchemaType.STRING },
        },
        required: ['topic', 'keywords', 'questions', 'category'],
      },
      maxOutputTokens: 2048,
    },
  })

  const result = await model.generateContent(userPrompt)
  let text = result.response.text()

  // Strip markdown code fences if the model wraps the JSON
  text = text.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '').trim()

  const parsed = JSON.parse(text) as Topic

  if (!parsed.topic || !Array.isArray(parsed.keywords) || !Array.isArray(parsed.questions) || !parsed.category) {
    throw new Error('La respuesta del modelo no tiene el formato esperado.')
  }

  return parsed
}
