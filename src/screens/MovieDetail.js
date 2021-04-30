import moment from 'moment';
import { Image, Spinner, Text } from 'native-base';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getImageFromApi, getMovieDetailFromApi } from '../api/TMBDapi';

const MovieDetail = (props) => {
    const [movie, setMovie] = useState(undefined);

    useEffect(() => {
        console.log(props.route.params.id);
        getMovieDetailFromApi(props.route.params.id).then(data => {
            console.log(data);
            setMovie(data);
        })
    });

    if (movie === undefined) {
        return (
            <Spinner color='gray' />
        )
    }

    else {
        return (
            <View style={styles.main_container}>
                <ScrollView style={styles.scrollview_container}>
                    {/* <Image
                        style={styles.image}
                        source={{ uri: getImageFromApi(movie.backdrop_path) }}
                    /> */}
                    <Text style={styles.title_text}>{movie.title}</Text>
                    <Text style={styles.description_text}>{movie.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(movie.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {movie.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {movie.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(movie.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {movie.genres.map(function (genre) {
                        return genre.name;
                    }).join(" / ")}
                    </Text>
                    <Text style={styles.default_text}>Companie(s) : {movie.production_companies.map(function (company) {
                        return company.name;
                    }).join(" / ")}
                    </Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    }
})

export default MovieDetail;